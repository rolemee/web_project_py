import re

a = '''<div id="topics">
	<div class = "post">
		<h1 class = "postTitle">
			<a id="cb_post_title_url" class="postTitle2" href="https://www.cnblogs.com/cq90/p/6959567.html">python学习-字符串前面添加u,r,b的含义</a>
		</h1>
		<div class="clear"></div>
		<div class="postBody">
			<div id="cnblogs_post_body" class="blogpost-body"><p>u/U:表示unicode字符串&nbsp;<br>不是仅仅是针对中文, 可以针对任何的字符串，代表是对字符串进行unicode编码。&nbsp;<br>一般英文字符在使用各种编码下, 基本都可以正常解析, 所以一般不带u；但是中文, 必须表明所需编码, 否则一旦编码转换就会出现乱码。&nbsp;<br>建议所有编码方式采用utf8</p>
<p>r/R:非转义的原始字符串&nbsp;<br>与普通字符相比，其他相对特殊的字符，其中可能包含转义字符，即那些，反斜杠加上对应字母，表示对应的特殊含义的，比如最常见的”\n”表示换行，”\t”表示Tab等。而如果是以r开头，那么说明后面的字符，都是普通的字符了，即如果是“\n”那么表示一个反斜杠字符，一个字母n，而不是表示换行了。&nbsp;<br>以r开头的字符，常用于正则表达式，对应着re模块。</p>
<p>b:bytes&nbsp;<br>python3.x里默认的str是(py2.x里的)unicode, bytes是(py2.x)的str, b”“前缀代表的就是bytes&nbsp;<br>python2.x里, b前缀没什么具体意义， 只是为了兼容python3.x的这种写法</p>
<p>&nbsp;</p>
<p>参考：http://blog.csdn.net/u010496169/article/details/70045895</p></div><div id="MySignature"></div>
<div class="clear"></div>
<div id="blog_post_info_block">
<div id="BlogPostCategory"></div>
<div id="EntryTag"></div>
<div id="blog_post_info">
</div>
<div class="clear"></div>
<div id="post_next_prev"></div>
</div>'''

b = """
asd\nasd
asd
"""
print(repr(b))