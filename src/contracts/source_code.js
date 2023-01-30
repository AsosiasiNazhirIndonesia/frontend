export const sourceCode = `// SPDX-License-Identifier: unlicensed
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "../interfaces/IWalletMapping.sol";
import "../interfaces/ICertificateSet.sol";
import "./BitMaps.sol";

contract CertificateSet is
    Context,
    ERC165,
    IERC1155,
    ICertificateSet,
    Ownable,
    IERC1155MetadataURI
{
    using BitMaps for BitMaps.BitMap;

    enum CertificateStatus{ CREATED, DROPPED, ISSUED }

    address public walletMapping;
    uint96 public maxCertificateType;
    string public contractURI;
    string private _uri;
    mapping(address => BitMaps.BitMap) private _balances;
    mapping(uint256 => uint256) private _expiries;

//===========================

    //Certificate issuer (ADMIN)
    mapping(uint256 => address) private _issuer;
    
    //Certificate value of keccak256(receiver_name + certificate_no + certificate_title + description_text + certificate_score + certificate_date)
    mapping(uint256 => bytes32) private _certificateHash;

    //Certificate receiver
    mapping(uint256 => address) private _receiver;
    mapping(uint256 => bool) private _signedByReceiver;

    //Certificate signer
    mapping(uint256 => uint256) private _totalApprover;
    mapping(uint256 => uint) private _totalSignature;
    mapping(uint256 => address[]) private _approvers;
    mapping(uint256 => bool[]) private _signedByApprovers;

    mapping(uint256 => CertificateStatus) private _status;

//===========================



    address private constant ZERO_ADDRESS = address(0);
    uint256 private constant BITMAP_SIZE = 256;

    event CertificateDropped(uint256 date);
    event CertificateIssued(uint256 date);
    event SignedByReceiver(address receiver, uint256 date);
    event SignedByApprover(address approver, uint256 date);

    constructor(
        address _owner,
        address _walletMapping,
        string memory _baseUri
    ) {
        walletMapping = _walletMapping;
        setURI(
            string.concat(
                _baseUri,
                Strings.toHexString(uint160(address(this)), 20),
                "/"
            )
        ); // base + address(this) + /
        setContractURI(
            string.concat(
                _baseUri,
                Strings.toHexString(uint160(address(this)), 20),
                "/"
            )
        ); // base + address(this) + /
        transferOwnership(_owner);
    }

    /**
     * @notice Get token metadata URI
     * @param id token id
     * @return URI string
     */
    function uri(uint256 id) external view returns (string memory) {
        return string.concat(_uri, Strings.toString(id));
    }


    /**
     * @notice Get token status
     * @param id token id
     * @return status CertificateStatus
     */
    function status(uint256 id) external view returns (CertificateStatus) {
        return _status[id];
    }

    function issuer(uint256 id) external view returns (address) {
        return _issuer[id];
    }

    function certificateHashOf(uint256 id) external view returns (bytes32) {
        return _certificateHash[id];
    }

    function receiver(uint256 id) external view returns (address) {
        return _receiver[id];
    }

    function signedByReceiver(uint256 id) external view returns (bool) {
        return _signedByReceiver[id];
    }

    function totalApprover(uint256 id) external view returns (uint256) {
        return _totalApprover[id];
    }

    function totalSignature(uint256 id) external view returns (uint) {
        return _totalSignature[id];
    }    
    
    function approvers(uint256 id) external view returns (address[] memory) {
        return _approvers[id];
    }    
    
    function signedByApprovers(uint256 id) external view returns (bool[] memory) {
        return _signedByApprovers[id];
    }

    /**
     * @notice Get token expiry timestamp (unix)
     * @param tokenId token id
     * @return expiry timestamp (unix)
     */
    function expiryOf(uint256 tokenId) external view returns (uint256) {
        return _expiries[tokenId];
    }

    /**
     * @notice Get balances for a list of token/address pairs
     * @param accounts account addresses
     * @param ids token ids
     * @return array of balances for each token/address pair
     */
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    ) external view returns (uint256[] memory) {
        uint256 count = accounts.length;
        if (count != ids.length) revert ArrayParamsUnequalLength();
        uint256[] memory batchBalances = new uint256[](count);
        for (uint256 i = 0; i < count; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }
        return batchBalances;
    }

    /**
     * @notice Mint token to an account address
     * @dev Checks if "to" address param has an associated linked wallet (in WalletMapping). If yes, mints to that address. If no, mints to the "to" address. Only callable by contract owner.
     * @param to Address to mint to
     * @param certificateType Desired certificate type to mint (must not currently own)
     * @param expiry Token expiration timestamp (unix). If no expiry, input "0"
     * @return tokenId Token id of successfully minted token
     */
    function mint(
        address to,
        uint96 certificateType,
        uint256 expiry,        
        bytes32 certificateHash,
        address[] memory signers
    ) external onlyOwner returns (uint256 tokenId) {
        address user = getUser(to);

        tokenId = _mint(user, certificateType, expiry, certificateHash, signers);

        emit TransferSingle(_msgSender(), ZERO_ADDRESS, user, tokenId, 1);
        _doSafeTransferAcceptanceCheck(
            _msgSender(),
            ZERO_ADDRESS,
            user,
            tokenId,
            1,
            ""
        );
    }

    function receiverSigning(uint256 tokenId, bytes memory signature) external {
        _receiverSigning(tokenId, signature);
        emit CertificateIssued(block.timestamp);
    }
    
    function approverSigning(uint256 tokenId, bytes memory signature) external {
        _approverSigning(tokenId, signature);
    }

    /**
     * @notice Mint multiple tokens to an account address
     * @dev Checks if "to" address param has an associated linked wallet (in WalletMapping). If yes, mints to that address. If no, mints to the "to" address. Only callable by contract owner.
     * @param account Address to mint to
     * @param certificateTypes Certificate types to mint
     * @param expiries Token expiration timestamps (unix). If no expiries, input array of "0" (matching certificateTypes length)
     * @return tokenIds Token ids of successfully minted tokens
     */
    function mintBatch(
        address account,
        uint96[] memory certificateTypes,
        uint256[] memory expiries,
        bytes32[] memory certificateHashes,
        address[][] memory signers
    ) external onlyOwner returns (uint256[] memory tokenIds) {
        if (certificateTypes.length != expiries.length)
            revert ArrayParamsUnequalLength();
        address user = getUser(account);
        uint256 mintCount = certificateTypes.length;

        tokenIds = new uint[](mintCount);
        uint[] memory amounts = new uint[](mintCount); // used in event

        for (uint256 i = 0; i < mintCount; i++) {
            uint256 tokenId = _mint(user, certificateTypes[i], expiries[i], certificateHashes[i], signers[i]);
            tokenIds[i] = tokenId;
            amounts[i] = 1;
        }

        emit TransferBatch(_msgSender(), ZERO_ADDRESS, user, tokenIds, amounts);
        _doSafeBatchTransferAcceptanceCheck(
            _msgSender(),
            ZERO_ADDRESS,
            user,
            tokenIds,
            amounts,
            ""
        );
    }

    /**
     * @notice Revoke (burn) a token from an account address
     * @dev Checks if "account" address param has an associated linked wallet (in WalletMapping). If yes, revokes from that address. If no, revokes from the "account" address. Only callable by contract owner. Deletes token expiry.
     * @param account Address to revoke from
     * @param certificateType Certificate type to revoke (must currently own)
     * @return tokenId Token id of successfully revoked token
     */
    function revoke(
        address account,
        uint96 certificateType
    ) external onlyOwner returns (uint256 tokenId) {
        address user = getUser(account);
        tokenId = _revoke(user, certificateType);
        emit TransferSingle(_msgSender(), user, ZERO_ADDRESS, tokenId, 1);
    }

    /**
     * @notice Revoke (burn) multiple tokens from an account address
     * @dev Checks if "account" address param has an associated linked wallet (in WalletMapping). If yes, revokes from that address. If no, revokes from the "account" address. Only callable by contract owner. Deletes token expiry.
     * @param account Address to revoke from
     * @param certificateTypes Desired certificate types to revoke (must currently own)
     * @return tokenIds Token ids of successfully revoked tokens
     */
    function revokeBatch(
        address account,
        uint96[] memory certificateTypes
    ) external onlyOwner returns (uint[] memory tokenIds) {
        address user = getUser(account);
        uint256 revokeCount = certificateTypes.length;

        tokenIds = new uint[](revokeCount); // used in event, return value
        uint[] memory amounts = new uint[](revokeCount); // used in event

        for (uint256 i = 0; i < revokeCount; i++) {
            uint256 tokenId = _revoke(user, certificateTypes[i]);
            tokenIds[i] = tokenId;
            amounts[i] = 1;
        }

        emit TransferBatch(_msgSender(), user, ZERO_ADDRESS, tokenIds, amounts);
    }

    // TODO: this should have a return check value
    /**
     * @notice Transition tokens from a lite wallet to a linked real wallet
     * @dev Certificate (token) ownership state is stored in bitmaps. To save gas, this function copies over the "from" address's bitmap state (1 uint256 for each 256 token types) to the "to" address, and emits individual transfer events in a loop.
     * @param from Address to transiton all tokens from
     * @param to Address to transition all tokens to
     */
    function moveUserTokensToWallet(address from, address to) external {
        if (getUser(from) != to) revert WalletNotLinked(to);
        uint256 bitmapCount = maxCertificateType / BITMAP_SIZE;
        for (uint256 i = 0; i <= bitmapCount; i++) {
            uint256 bitmap = _balances[from]._data[i];
            if (bitmap != 0) {
                emitTransferEvents(bitmap, from, to);
                _balances[to]._data[i] = bitmap; // copy over ownership bitmap
                delete _balances[from]._data[i]; // delete old ownership bitmap
            }
        }
        emit TransitionWallet(from, to);
    }

    // No-Ops for ERC1155 transfer and approval functions. CertificateSet tokens are Soulbound and cannot be transferred. Functions are included for ERC1155 interface compliance

    /** 
     * @notice will revert. Soulbound tokens cannot be transferred.
    */
    function setApprovalForAll(address operator, bool approved) external pure {
        revert SoulboundTokenNoSetApprovalForAll(operator, approved);
    }

    /** 
     * @notice will revert. Soulbound tokens cannot be transferred.
    */
    function isApprovedForAll(
        address account,
        address operator
    ) external pure returns (bool) {
        revert SoulboundTokenNoIsApprovedForAll(account, operator);
    }

    /** 
     * @notice will revert. Soulbound tokens cannot be transferred.
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external pure {
        revert SoulboundTokenNoSafeTransferFrom(from, to, id, amount, data);
    }

    /** 
     * @notice will revert. Soulbound tokens cannot be transferred.
    */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external pure {
        revert SoulboundTokenNoSafeBatchTransferFrom(
            from,
            to,
            ids,
            amounts,
            data
        );
    }

    /**
     * @notice Update token metadata base URI
     * @param newuri New URI
     */
    function setURI(string memory newuri) public onlyOwner {
        _uri = newuri;
    }

    /**
     * @notice Update contract metadata URI
     * @param newuri New URI
     */
    function setContractURI(string memory newuri) public onlyOwner {
        contractURI = newuri;
    }

    /**
     * @notice Get token balance of an account address
     * @param account Account address
     * @param id Token id
     * @return balance Token balance (1 or 0)
     */
    function balanceOf(
        address account,
        uint256 id
    ) public view returns (uint256 balance) {
        (uint96 _certificateType, address _account) = decodeTokenId(id);
        address user = getUser(_account);
        if (user != account) return 0;
        BitMaps.BitMap storage bitmap = _balances[user];
        bool owned = BitMaps.get(bitmap, _certificateType);
        return owned ? 1 : 0;
    }

    /**
     * @notice Returns a serialized token id based on a certificateType and owner account address
     * @dev Each user can only own one of each certificate type. Serializing ids based on a certificateType and owner address allows us to have both shared, certificateType level metadata as well as individual token data (e.g. expiry timestamp). First 12 bytes = certificateType (uint96), next 20 bytes = owner address.
     * @param certificateType Certificate type
     * @param account Owner account address
     * @return tokenId Serialized token id
     */
    function encodeTokenId(
        uint96 certificateType,
        address account
    ) public pure returns (uint256 tokenId) {
        tokenId = uint256(bytes32(abi.encodePacked(certificateType, account)));
    }

    /**
     * @notice Decodes a serialized token id to reveal its certificateType and owner account address
     * @param tokenId Serialized token id
     * @return certificateType Certificate type
     * @return account Owner account address
     */
    function decodeTokenId(
        uint256 tokenId
    ) public pure returns (uint96 certificateType, address account) {
        certificateType = uint96(tokenId >> 160);
        account = address(uint160(uint256(((bytes32(tokenId) << 96) >> 96))));
    }

    /** 
     * @dev Verifies contract supports the standard ERC1155 interface
    */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            super.supportsInterface(interfaceId);
    }

   
    

    /** 
     * @dev Internal shared function to mint tokens and set expiries
    */
    function _mint(
        address user,
        uint96 certificateType,
        uint256 expiry,
        bytes32 certificateHash,
        address[] memory signers
    ) internal returns (uint256 tokenId) {
        tokenId = encodeTokenId(certificateType, user);

        bool isExpired = expiry > 0 && expiry <= block.timestamp;
        uint256 priorBalance = balanceOf(user, tokenId);
        if (isExpired) revert IncorrectExpiry(user, certificateType, expiry);
        if (priorBalance > 0)
            revert IncorrectBalance(user, certificateType, priorBalance); // token already owned

        BitMaps.BitMap storage balances = _balances[user];
        BitMaps.set(balances, certificateType);
        _expiries[tokenId] = expiry;
        _certificateHash[tokenId] = certificateHash;
        _issuer[tokenId] = msg.sender;
        _receiver[tokenId] = user;
        _signedByReceiver[tokenId] = false;
        _approvers[tokenId] = signers;
        _totalApprover[tokenId] = signers.length;
        _totalSignature[tokenId] = 0;
        uint256 index;
        for(index = 0; index < _totalApprover[tokenId]; index++) {
            _signedByApprovers[tokenId].push(false);
        }
        _status[tokenId] = CertificateStatus.CREATED;

        uint96 nextPossibleNewCertificateType = uint96(maxCertificateType) + 1; // ensure new certificateTypes are one greater, pack bitmaps sequentially
        if (certificateType > nextPossibleNewCertificateType)
            revert NewCertificateTypeNotIncremental(certificateType, maxCertificateType);
        if (certificateType == nextPossibleNewCertificateType) maxCertificateType = certificateType;
    }

    /** 
     * @dev Internal shared function to revoke (burn) tokens and delete associated expiries
    */
    function _revoke(
        address user,
        uint96 certificateType
    ) internal returns (uint256 tokenId) {
        tokenId = encodeTokenId(certificateType, user);

        uint256 priorBalance = balanceOf(user, tokenId);
        if (priorBalance == 0)
            revert IncorrectBalance(user, certificateType, priorBalance); // token not owned

        BitMaps.BitMap storage balances = _balances[user];
        BitMaps.unset(balances, certificateType);
        delete _expiries[tokenId];
    }
    
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }
    
    function _receiverSigning(uint256 tokenId, bytes memory signature) internal {
        require(_status[tokenId] == CertificateStatus.CREATED, 'invalid certificate status');
        require(_totalSignature[tokenId] == _totalApprover[tokenId], 'waiting for approver signature');
        require(!_signedByReceiver[tokenId], 'already signed by receiver');
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, _certificateHash[tokenId]));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(signature);
        require(ecrecover(prefixedHash, v, r, s) == _receiver[tokenId], 'invalid receiver signature');
        
        _signedByReceiver[tokenId] = true;
        _status[tokenId] = CertificateStatus.ISSUED;
        emit SignedByReceiver(_receiver[tokenId], block.timestamp);
    }
    
    function _approverSigning(uint256 tokenId, bytes memory signature) internal {
        require(_status[tokenId] == CertificateStatus.CREATED, 'invalid certificate status');
        int approverIndex = -1;
        uint256 index;
        for (index = 0; index < _approvers[tokenId].length; index++) {
            if (_approvers[tokenId][index] == msg.sender) {
                approverIndex = int(index);
            }
        }
        require(approverIndex >= 0, 'approver not found');
        require(!_signedByApprovers[tokenId][uint256(approverIndex)], 'already signed');
        if (approverIndex > 0) {
            require(_signedByApprovers[tokenId][uint256(approverIndex - 1)], 'waiting for other approver');
        }
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, _certificateHash[tokenId]));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(signature);
        require(ecrecover(prefixedHash, v, r, s) == _approvers[tokenId][uint256(approverIndex)], 'invalid approver signature');
        
        _signedByApprovers[tokenId][uint256(approverIndex)] = true;
        _totalSignature[tokenId] = _totalSignature[tokenId] + 1;
        emit SignedByApprover(_approvers[tokenId][uint256(approverIndex)], block.timestamp);
    }

    /** 
     * @dev Checks if an account address has an associated linked real wallet in WalletMapping. If so, returns it. Otherwise, returns original account address param value
    */
    function getUser(address account) internal view returns (address) {
        return IWalletMapping(walletMapping).getLinkedWallet(account);
    }

    /** 
     * @dev Internal function to emit transfer events for each owned certificate (used in transitioning tokens after wallet linking)
    */
    function emitTransferEvents(
        uint256 bitmap,
        address from,
        address to
    ) private {
        for (uint256 i = 0; i < BITMAP_SIZE; i++) {
            if (bitmap & (1 << i) > 0) {
                // token type is owned
                emit TransferSingle(
                    _msgSender(),
                    from,
                    to,
                    encodeTokenId(uint96(i), from),
                    1
                );
            }
        }
    }

    /** 
     * @dev ERC1155 receiver check to ensure a "to" address can receive the ERC1155 token standard, used in single mint
    */
    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (to.code.length > 0) {
            // check if contract
            try
                IERC1155Receiver(to).onERC1155Received(
                    operator,
                    from,
                    id,
                    amount,
                    data
                )
            returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert ERC1155ReceiverRejectedTokens();
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert ERC1155ReceiverNotImplemented();
            }
        }
    }

    /** 
     * @dev ERC1155 receiver check to ensure a "to" address can receive the ERC1155 token standard, used in batch mint
    */
    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) private {
        if (to.code.length > 0) {
            // check if contract
            try
                IERC1155Receiver(to).onERC1155BatchReceived(
                    operator,
                    from,
                    ids,
                    amounts,
                    data
                )
            returns (bytes4 response) {
                if (
                    response != IERC1155Receiver.onERC1155BatchReceived.selector
                ) {
                    revert ERC1155ReceiverRejectedTokens();
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert ERC1155ReceiverNotImplemented();
            }
        }
    }
}`;
