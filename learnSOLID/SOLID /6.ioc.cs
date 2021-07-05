//IoC容器，它就是一个创建工厂，你要什么对象，它就给你什么对象，有了IoC容器，依赖关系就变了，
//原先的依赖关系就没了，它们都依赖IoC容器了，通过IoC容器来建立它们之间的关系。
//通过反射来创建，把具体的文件名写在配置文件里，这时候客户端代码也不用变了，只需要改配置文件就好了，稳定性又有了提高，如下：

public class MediaFile {
    public void PlayMedia() {
        IMediaFile _mtype = Assembly.Load(ConfigurationManager.AppSettings["AssemName"]).CreateInstance(ConfigurationManager.AppSettings["MediaName"]);
        IPlayer _player = Assembly.Load(ConfigurationManager.AppSettings["AssemName"]).CreateInstance(ConfigurationManager.AppSettings["PlayerName"]);
        _player.Play(_mtype);
    }
}

