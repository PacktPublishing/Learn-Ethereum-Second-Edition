
async function getWeb3() {
    const Web3 = require('web3')
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    return web3
}
async function encodeFunctionSignatureJson(web3) {
    return await web3.eth.abi.encodeFunctionSignature({
        name: 'myMethod',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'input1'
        },{
            type: 'string',
            name: 'input2'
        }]
    })
}

async function encodeFunctionSignatureString(web3) {
    return await web3.eth.abi.encodeFunctionSignature('myMethod(uint256,string)')
}

async function encodeParameters(web3, typesArray, parameters) {
    return await web3.eth.abi.encodeParameters(typesArray, parameters);
}

async function decodeParameters(web3, typesArray, hexString) {
    return await web3.eth.abi.decodeParameters(typesArray, hexString);
}
async function encodeFunctionCall(web3, jsonInterface, parameters) {
    return await web3.eth.abi.encodeFunctionCall(jsonInterface, parameters);
}

async function main() {
    let web3= await getWeb3()
    let encodeOutput = await encodeFunctionSignatureJson(web3)
    console.log(`encodeFunctionSignature by Json: ${ encodeOutput}`)
    encodeOutput = await encodeFunctionSignatureString(web3)
    console.log(`encodeFunctionSignature by String: ${ encodeOutput}`)
    let typesArray = [
        'uint8[]',
        {
            "Struct": {
                "propertyOne": 'uint256',
                "propertyTwo": 'uint256'
            }
        }
    ];
    let parameters= [
        ['10','11'],
        {
            "propertyOne": '100',
            "propertyTwo": '200',
        }
    ];
    let hexString = await encodeParameters(web3, typesArray, parameters);
    console.log(`encodeParameters hexString: ${ hexString}`)
    let decodeOutput = await decodeParameters(web3, typesArray, hexString) 
    console.log(`decodeOutput: ${ JSON.stringify(decodeOutput)}`)
    let jsonInterface = {
        name: 'myMethod',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'input1'
        },{	
            type: 'string',
            name: 'input2'
        }]
    };
    let parameters2 = [100, 'test']

    let encodeFunctionCallOutput = await encodeFunctionCall(web3, jsonInterface, parameters2) 
    console.log(`encodeFunctionCallOutput: ${encodeFunctionCallOutput}`)
}
main()