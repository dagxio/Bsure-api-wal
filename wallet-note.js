// about wallet notes
// we need address 、wallet、 is_change、address_index、 definition、
// about HD wallet， reference： https://ethfans.org/posts/from-BIP-to-ethereum-HD-wallet
// about HD wallet， reference2： https://medium.com/@bun919tw/hd-wallet-970096a6d72f
// about BIP规范： BIP32 BIP38、BIP39、BIP44 之间的异同  reference3: https://www.zhihu.com/question/263437658
const device = require('byteballcore/device.js');


// >> Address
//  definition_chash = objectHash.getChash160(definition);
//  address = objectHash.getChash160(arrDefinition);
var address = objectHash.getChash160(["sig", {"pubkey": wallet_defined_by_keys.derivePubkey(xPubKey, 'm/' + is_change + '/' + currentAddressIndex)}]);



// >> definition：
var arrDefinition = ["sig", {"pubkey": wallet_defined_by_keys.derivePubkey(xPubKey, 'm/' + is_change + '/' + currentAddressIndex)}];

// >> DefinitionTemplate：
var arrDefinitionTemplate = ["sig", {pubkey: '$pubkey@'+device.getMyDeviceAddress()}];

// >> xPubKey：（extended_pubkey）
var  strXPubKey = Bitcore.HDPublicKey(xPrivKey.derive("m/44'/0'/0'")).toString();
var     xPubKey = Bitcore.HDPublicKey(self.xPrivKey.derive("m/44'/0'/" + currentWalletIndex + "'"));

// >> xPrivKey （extended_privkey）
var xPrivKey = mnemonic.toHDPrivateKey(passphrase);

// >> my device PrivKey  设备私钥
  let devicePrivKey = xPrivKey.derive("m/1'").privateKey.bn.toBuffer({size:32});
// >> my device address 设备地址
  device.setDevicePrivateKey(devicePrivKey);
  let my_device_address = device.getMyDeviceAddress();
// >> my device pubkey 设备公钥
  let my_device_pubkey = device.getMyDevicePubKey();


// >> 派生的私钥、公钥、签名

function signWithLocalPrivateKey(wallet_id, account, is_change, address_index, text_to_sign, handleSig){
  // path define
  var path = "m/44'/0'/" + account + "'/"+is_change+"/"+address_index;
	var privateKey = xPrivKey.derive(path).privateKey;
	var privKeyBuf = privateKey.bn.toBuffer({size:32}); // https://github.com/bitpay/bitcore-lib/issues/47
	handleSig(ecdsaSig.sign(text_to_sign, privKeyBuf));
}

// >> 读取keys.json，启动并创建钱包
var KEYS_FILE_DATA = file.readFile("keys.json");
var keys = JSON.parse(KEYS_FILE_DATA);
var deviceTempPrivKey = Buffer(keys.temp_priv_key, 'base64');
var devicePrevTempPrivKey = Buffer(keys.prev_temp_priv_key, 'base64');
//-- ...
var mnemonic = new Mnemonic(keys.mnemonic_phrase);
var xPrivKey = mnemonic.toHDPrivateKey(passphrase);
createWallet(xPrivKey, function(){
  onDone(keys.mnemonic_phrase, passphrase, deviceTempPrivKey, devicePrevTempPrivKey);
});


// createWallet   xPrivKey -> XPubKey -> devicePrivKey  -> ( my_device_address & my_device_pubkey )
function createWallet(xPrivKey, onDone){
	var devicePrivKey = xPrivKey.derive("m/1'").privateKey.bn.toBuffer({size:32});
	var device = require('byteballcore/device.js');
	device.setDevicePrivateKey(devicePrivKey); // we need device address before creating a wallet
	var strXPubKey = Bitcore.HDPublicKey(xPrivKey.derive("m/44'/0'/0'")).toString();
	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
	// we pass isSingleAddress=false because this flag is meant to be forwarded to cosigners and headless wallet doesn't support multidevice
	walletDefinedByKeys.createWalletByDevices(strXPubKey, 0, 1, [], 'any walletName', false, function(wallet_id){
		walletDefinedByKeys.issueNextAddress(wallet_id, 0, function(addressInfo){
			onDone();
		});
	});
}


/*
   关系线1： xPrivKey -> XPubKey -> devicePrivKey  -> ( my_device_address & my_device_pubkey )

   关系线2： XPubKey -> definition -> address

   关系线3： XPubKey -> wallet

 */
