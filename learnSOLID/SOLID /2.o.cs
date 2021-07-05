//abstract修饰的类，叫做抽象类，是不允许实例化的类，
//不能直接创建对象，必须要通过子类创建才能使用abstract类的方法。
abstract class DataAccess
{
    public abstract void OpenConnection();
    public abstract void CloseConnection();
    public abstract void ExecuteCommand();
}

/// <summary>
/// SQL
/// </summary>
class SqlDataAccess : DataAccess
{
    /// <summary>
    /// 打开SQL数据库
    /// </summary>
    public override void OpenConnection() { }
    /// <summary>
    /// 关闭Sql数据连接
    /// </summary>
    public override void CloseConnection() { }
    /// <summary>
    /// 执行Sql数据命令
    /// </summary>
    public override void ExecuteCommand() { }
}

/// <summary>
/// ORACLE
/// </summary>
class OracleDataAccess : DataAccess
{
    /// <summary>
    /// 打开Oracle数据连接
    /// </summary>
    public override void OpenConnection() { }
    /// <summary>
    /// 关闭Oracle数据连接
    /// </summary>
    public override void CloseConnection() { }
    /// <summary>
    /// 执行Oracle数据命令
    /// </summary>
    public override void ExecuteCommand() { }
}