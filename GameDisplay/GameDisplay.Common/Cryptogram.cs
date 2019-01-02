using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace GameDisplay.Common
{
    public class Cryptogram
    {
        public static string MD5Encrypt64(string content)
        {
            MD5 md5 = MD5.Create(); //实例化一个md5对像
            // 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] s = md5.ComputeHash(Encoding.UTF8.GetBytes(content));
            return Convert.ToBase64String(s);
        }

        public static string JwtEncode(JWTPayloadInfo payload)
        {
            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
            payload.exp = DateTime.Now.AddHours(2).Ticks;

            return encoder.Encode(payload, GetSecret());
        }

        public static JWTPayloadInfo JwtDecode(string token)
        {
            IJsonSerializer serializer = new JsonNetSerializer();
            IDateTimeProvider provider = new UtcDateTimeProvider();
            IJwtValidator validator = new JwtValidator(serializer, provider);
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

            return decoder.DecodeToObject<JWTPayloadInfo>(token, GetSecret(), true);
        }

        /// <summary>
        /// 获取私钥
        /// </summary>
        /// <returns></returns>
        private static string GetSecret()
        {
            //TODO 从文件中去读真正的私钥
            return "123456789";
        }
    }
}
