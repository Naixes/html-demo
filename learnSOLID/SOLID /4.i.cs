interface IDataAccess
{
    void OpenConnection();
    void CloseConnection();
}

interface ISqlDataAccess : IDataAccess
{
    void ExecuteSqlCommand();
}
interface IOracleDataAccess : IDataAccess
{
    void ExecuteOracleCommand();
}
class SqlDataAccess : ISqlDataAccess
{
    /// <summary>
    /// 执行Sql数据命令
    /// </summary>
    public void ExecuteSqlCommand(){}

    /// <summary>
    /// 打开Sql数据连接
    /// </summary>
    public void OpenConnection(){}

    /// <summary>
    /// 关闭Sql数据连接
    /// </summary>
    public void CloseConnection(){}
}
class OracleDataAccess : IOracleDataAccess
{
    /// <summary>
    /// 执行Oracle数据命令
    /// </summary>
    public void ExecuteOracleCommand(){}

    /// <summary>
    /// 打开Oracle数据连接
    /// </summary>
    public void OpenConnection(){}

    /// <summary>
    /// 关闭Oracle数据连接
    /// </summary>
    public void CloseConnection(){}
}