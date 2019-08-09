# Requests 是 Python HTTP 的客户端库
# 两种访问方式：Get 和 Post。
# Get 把参数包含在 url 中，而 Post 通过 request body 来传递参数。

# r.text 或 r.content 可以来获取HTML 的正文。
r = requests.get('http://www.douban.com')

# post
# data 的数据类型是个字典的结构，采用 key 和 value 的方式进行存储。
r = requests.post('http://xxx.com', data = {'key':'value'})

