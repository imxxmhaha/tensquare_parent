//			Uint8Array的byte数组转化为WordArray
CryptoJS.enc.u8array = {
	stringify: function(wordArray) {
		var words = wordArray.words;
		var sigBytes = wordArray.sigBytes;
		var u8 = new Uint8Array(sigBytes);
		for(var i = 0; i < sigBytes; i++) {
			var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			u8[i] = byte;
		}
		return u8;
	},

	parse: function(u8arr) {
		var len = u8arr.length;
		var words = [];
		for(var i = 0; i < len; i++) {
			words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
		}
		return CryptoJS.lib.WordArray.create(words, len);
	}
};

//			byte和字符串的互相转换函数
DataType = {
	base64To16Bytes: function(b64) {
		var binary = atob(b64);
		var length = binary.length;
		var bytes = new Uint8Array(16);
		for(var i = 0, j = 2; j < length; i++, j++) {
			// Ignore the top 2 bytes(0x01, 0x08)
			bytes[i] = binary.charCodeAt(j);
		}
		return bytes;
	},

	hexTo16Bytes: function(hex) {
		var bytes = new Uint8Array(16);
		for(var i = 0, j = 0; i < hex.length; i += 2, j++) {
			var substr = hex.substring(i, i + 2);
			bytes[j] = parseInt(substr, 16);
		}
		return bytes;
	},

	binaryToString: function(bytes) {
		var result = '';
		for(var i = 0; i < bytes.length; i++) {
			result += String.fromCharCode(bytes[i]);
		}
		return result;
	},

	binaryToHexString: function(bytes) {
		var result = '';
		for(var i = 0; i < bytes.length; i++) {
			var hex = (bytes[i] & 0xff).toString(16);
			hex = hex.length === 1 ? '0' + hex : hex;
			result += hex;
		}
		return result.toUpperCase();
	}
};

var aesutil = {
	encrypt: function(randomCode, key) {
		var keyBytes = DataType.hexTo16Bytes(key); // 密钥，16bytes

		keyBytes = CryptoJS.enc.u8array.parse(keyBytes); // 数据解析
		var encrypted = CryptoJS.AES.encrypt(randomCode, keyBytes, {
			mode: CryptoJS.mode.ECB, // 需要导入CryptoJS的ecb.js
			padding: CryptoJS.pad.Pkcs7 // 需要导入CryptoJS的nopadding.js
		});
		return encrypted.toString();
	}
}