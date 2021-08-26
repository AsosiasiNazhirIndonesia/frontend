import web3 from '../services/web3';
import abi from './abi.json';
import bytecodes from './bytecodes.json';

const DigiCertContract = {}
const bytecode = "0x60806040523480156200001157600080fd5b5060405162001dab38038062001dab833981810160405281019062000037919062000323565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260018190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060059080519060200190620000d7929190620001a5565b506000600760006101000a81548160ff0219169083600281111562000125577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550805160038190555060005b6003548110156200019b576006600090806001815401808255809150506001900390600052602060002090602091828204019190069091909190916101000a81548160ff0219169083151502179055508080620001929062000468565b91505062000135565b5050505062000559565b82805482825590600052602060002090810192821562000221579160200282015b82811115620002205782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620001c6565b5b50905062000230919062000234565b5090565b5b808211156200024f57600081600090555060010162000235565b5090565b60006200026a6200026484620003bb565b62000392565b905080838252602082019050828560208602820111156200028a57600080fd5b60005b85811015620002be5781620002a38882620002c8565b8452602084019350602083019250506001810190506200028d565b5050509392505050565b600081519050620002d98162000525565b92915050565b600082601f830112620002f157600080fd5b81516200030384826020860162000253565b91505092915050565b6000815190506200031d816200053f565b92915050565b6000806000606084860312156200033957600080fd5b600062000349868287016200030c565b93505060206200035c86828701620002c8565b925050604084015167ffffffffffffffff8111156200037a57600080fd5b6200038886828701620002df565b9150509250925092565b60006200039e620003b1565b9050620003ac828262000432565b919050565b6000604051905090565b600067ffffffffffffffff821115620003d957620003d8620004e5565b5b602082029050602081019050919050565b6000620003f78262000408565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200043d8262000514565b810181811067ffffffffffffffff821117156200045f576200045e620004e5565b5b80604052505050565b6000620004758262000428565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415620004ab57620004aa620004b6565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6200053081620003ea565b81146200053c57600080fd5b50565b6200054a81620003fe565b81146200055657600080fd5b50565b61184280620005696000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a20ee69911610071578063a20ee69914610157578063a987d90014610175578063d3650fb8146101a5578063d4782b89146101d5578063f4f51ea2146101f3578063f7260d3e1461020f576100b4565b80631d143848146100b95780631dee9aac146100d7578063200d2ed2146100f5578063798bd8e514610113578063871cb00d1461012f5780639176db5614610139575b600080fd5b6100c161022d565b6040516100ce9190611102565b60405180910390f35b6100df610251565b6040516100ec9190611161565b60405180910390f35b6100fd610257565b60405161010a91906111c1565b60405180910390f35b61012d60048036038101906101289190610e93565b61026a565b005b61013761085b565b005b610141610973565b60405161014e91906112fc565b60405180910390f35b61015f610979565b60405161016c9190611146565b60405180910390f35b61018f600480360381019061018a9190610ed4565b61098c565b60405161019c9190611146565b60405180910390f35b6101bf60048036038101906101ba9190610ed4565b6109c0565b6040516101cc9190611102565b60405180910390f35b6101dd6109ff565b6040516101ea91906112fc565b60405180910390f35b61020d60048036038101906102089190610e93565b610a05565b005b610217610dbe565b6040516102249190611102565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b600760009054906101000a900460ff1681565b600060028111156102a4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600760009054906101000a900460ff1660028111156102ec577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461032c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103239061125c565b60405180910390fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905060005b600580549050811015610410573373ffffffffffffffffffffffffffffffffffffffff16600582815481106103b2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156103fd578091505b80806104089061157f565b915050610354565b6000821215610454576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044b9061129c565b60405180910390fd5b6006828154811061048e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090602091828204019190069054906101000a900460ff16156104ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e5906112bc565b60405180910390fd5b600082131561059d57600660018361050691906113ea565b8154811061053d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090602091828204019190069054906101000a900460ff1661059c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610593906111dc565b60405180910390fd5b5b60006040518060400160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a33320000000081525090506000816001546040516020016105ee9291906110da565b604051602081830303815290604052805190602001209050600080600061061488610de4565b92509250925060058781548110610654577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600185858585604051600081526020016040526040516106b8949392919061117c565b6020604051602081039080840390855afa1580156106da573d6000803e3d6000fd5b5050506020604051035173ffffffffffffffffffffffffffffffffffffffff161461073a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107319061123c565b60405180910390fd5b600160068881548110610776577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090602091828204019190066101000a81548160ff02191690831515021790555060016004546107ae9190611394565b6004819055507fc984759cc551fb56fb2f49489497a1466db0a9cbda1cfb07632e1f4ef4d6cea16005888154811061080f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff164260405161084992919061111d565b60405180910390a15050505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e09061121c565b60405180910390fd5b6001600760006101000a81548160ff02191690836002811115610935577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055507fa9f291b3c16506b8137d9b9cb90a1279e271519d2d026f349114569fcba644a74260405161096991906112fc565b60405180910390a1565b60035481565b600260149054906101000a900460ff1681565b6006818154811061099c57600080fd5b9060005260206000209060209182820401919006915054906101000a900460ff1681565b600581815481106109d057600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b60006002811115610a3f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600760009054906101000a900460ff166002811115610a87577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610ac7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abe9061125c565b60405180910390fd5b60035460045414610b0d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b04906112dc565b60405180910390fd5b600260149054906101000a900460ff1615610b5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b54906111fc565b60405180910390fd5b60006040518060400160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600081600154604051602001610bae9291906110da565b6040516020818303038152906040528051906020012090506000806000610bd486610de4565b925092509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660018585858560405160008152602001604052604051610c36949392919061117c565b6020604051602081039080840390855afa158015610c58573d6000803e3d6000fd5b5050506020604051035173ffffffffffffffffffffffffffffffffffffffff1614610cb8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610caf9061127c565b60405180910390fd5b6001600260146101000a81548160ff0219169083151502179055506002600760006101000a81548160ff02191690836002811115610d1f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055507f71bd29d76df9a9b4f016f9af352a17b4cff069d30ad2d9205fec80557cf189bb600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1642604051610d7792919061111d565b60405180910390a17f6b352e211b4d936da8b329b89379dc32df52c107a79a9544f3ecb5ccbe5ee2b742604051610dae91906112fc565b60405180910390a1505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060006041845114610df757600080fd5b6020840151915060408401519050606084015160001a92509193909250565b6000610e29610e248461133c565b611317565b905082815260208101848484011115610e4157600080fd5b610e4c84828561150c565b509392505050565b600082601f830112610e6557600080fd5b8135610e75848260208601610e16565b91505092915050565b600081359050610e8d816117f5565b92915050565b600060208284031215610ea557600080fd5b600082013567ffffffffffffffff811115610ebf57600080fd5b610ecb84828501610e54565b91505092915050565b600060208284031215610ee657600080fd5b6000610ef484828501610e7e565b91505092915050565b610f068161147e565b82525050565b610f1581611490565b82525050565b610f248161149c565b82525050565b610f3b610f368261149c565b6115c8565b82525050565b6000610f4c8261136d565b610f568185611378565b9350610f6681856020860161151b565b80840191505092915050565b610f7b816114fa565b82525050565b6000610f8e601a83611383565b9150610f9982611670565b602082019050919050565b6000610fb1601a83611383565b9150610fbc82611699565b602082019050919050565b6000610fd4600e83611383565b9150610fdf826116c2565b602082019050919050565b6000610ff7601a83611383565b9150611002826116eb565b602082019050919050565b600061101a601a83611383565b915061102582611714565b602082019050919050565b600061103d601a83611383565b91506110488261173d565b602082019050919050565b6000611060601283611383565b915061106b82611766565b602082019050919050565b6000611083600e83611383565b915061108e8261178f565b602082019050919050565b60006110a6601e83611383565b91506110b1826117b8565b602082019050919050565b6110c5816114e3565b82525050565b6110d4816114ed565b82525050565b60006110e68285610f41565b91506110f28284610f2a565b6020820191508190509392505050565b60006020820190506111176000830184610efd565b92915050565b60006040820190506111326000830185610efd565b61113f60208301846110bc565b9392505050565b600060208201905061115b6000830184610f0c565b92915050565b60006020820190506111766000830184610f1b565b92915050565b60006080820190506111916000830187610f1b565b61119e60208301866110cb565b6111ab6040830185610f1b565b6111b86060830184610f1b565b95945050505050565b60006020820190506111d66000830184610f72565b92915050565b600060208201905081810360008301526111f581610f81565b9050919050565b6000602082019050818103600083015261121581610fa4565b9050919050565b6000602082019050818103600083015261123581610fc7565b9050919050565b6000602082019050818103600083015261125581610fea565b9050919050565b600060208201905081810360008301526112758161100d565b9050919050565b6000602082019050818103600083015261129581611030565b9050919050565b600060208201905081810360008301526112b581611053565b9050919050565b600060208201905081810360008301526112d581611076565b9050919050565b600060208201905081810360008301526112f581611099565b9050919050565b600060208201905061131160008301846110bc565b92915050565b6000611321611332565b905061132d828261154e565b919050565b6000604051905090565b600067ffffffffffffffff82111561135757611356611630565b5b6113608261165f565b9050602081019050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600061139f826114e3565b91506113aa836114e3565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156113df576113de6115d2565b5b828201905092915050565b60006113f5826114b9565b9150611400836114b9565b9250827f80000000000000000000000000000000000000000000000000000000000000000182126000841215161561143b5761143a6115d2565b5b827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018213600084121615611473576114726115d2565b5b828203905092915050565b6000611489826114c3565b9050919050565b60008115159050919050565b6000819050919050565b60008190506114b4826117e1565b919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000611505826114a6565b9050919050565b82818337600083830152505050565b60005b8381101561153957808201518184015260208101905061151e565b83811115611548576000848401525b50505050565b6115578261165f565b810181811067ffffffffffffffff8211171561157657611575611630565b5b80604052505050565b600061158a826114e3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156115bd576115bc6115d2565b5b600182019050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f77616974696e6720666f72206f7468657220617070726f766572000000000000600082015250565b7f616c7265616479207369676e6564206279207265636569766572000000000000600082015250565b7f496e76616c696420697373756572000000000000000000000000000000000000600082015250565b7f696e76616c696420617070726f766572207369676e6174757265000000000000600082015250565b7f696e76616c696420636572746966696361746520737461747573000000000000600082015250565b7f696e76616c6964207265636569766572207369676e6174757265000000000000600082015250565b7f617070726f766572206e6f7420666f756e640000000000000000000000000000600082015250565b7f616c7265616479207369676e6564000000000000000000000000000000000000600082015250565b7f77616974696e6720666f7220617070726f766572207369676e61747572650000600082015250565b600381106117f2576117f1611601565b5b50565b6117fe816114e3565b811461180957600080fd5b5056fea2646970667358221220252e039f903075a82647ffa6be68f719f5a54dae8e8d31a0d2817da7bbe2746164736f6c63430008040033"

DigiCertContract.getNewInstance = (address) => {
    return new web3.eth.Contract(abi, address);
}

DigiCertContract.deploy = (certificateHash, receiver, approvers) => {
    const digiCertContract = DigiCertContract.getNewInstance(undefined);
    return digiCertContract.deploy({
        data: bytecode,
        arguments: [certificateHash, receiver, approvers]
    })
}

export default DigiCertContract