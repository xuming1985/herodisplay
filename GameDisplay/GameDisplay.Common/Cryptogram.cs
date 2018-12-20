using System;
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
    }
}
