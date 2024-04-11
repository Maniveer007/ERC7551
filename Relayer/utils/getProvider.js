

function getProvider(chainid){
    if(chainid==80001){
    const MumbaiproviderURL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`;
    const Mumbaiprovider = new ethers.JsonRpcProvider(MumbaiproviderURL);
    
    return Mumbaiprovider;
}else if(chainid==11155420){
    const opSepoliaproviderURL=`https://opt-sepolia.g.alchemy.com/v2/${process.env.OPSEPOLIA_API_KEY}`
    const opSepoliaprovider = new ethers.JsonRpcProvider(opSepoliaproviderURL);

    return opSepoliaprovider;
}
else if(chainid==11155111){   
    const SepoliaproviderURL=`https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`
    const Sepoliaprovider = new ethers.JsonRpcProvider(SepoliaproviderURL);

    return Sepoliaprovider;
}
}

module.exports= getProvider