namespace SOLID
{
    public class Users
    {
        /// <summary>
        /// 支付
        /// </summary>
        public void Pay(){}

        /// <summary>
        /// 数据库操作
        /// </summary>
        public void DataAccess(){}

        /// <summary>
        /// 日志操作
        /// </summary>
        public void Logger(){}
    }
}
//1.在这个用户类中有这三个功能：1.支付逻辑，2数据库逻辑，3.日志操作。
//2.如果将这三个功能结合在一个类中，可能会出现修改部分代码时会破坏其他的部分。
//3.多个功能也使这个用户类难以理解，降低了内聚性。所以最好就是将这个类分离为三个分离的类，每个类仅仅有一个功能。
namespace SOLID
{
    /// <summary>
    /// 数据库操作
    /// </summary>
    class DataAccess { }

    /// <summary>
    /// 日志
    /// </summary>
    class Logger { }

    /// <summary>
    /// 支付
    /// </summary>
    class Pay { }
}
