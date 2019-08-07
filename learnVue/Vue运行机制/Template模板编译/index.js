// 会用到的正则
const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const singleAttrIdentifier = /([^\s"'<>/=]+)/
const singleAttrAssign = /(?:=)/
const singleAttrValues = [
  /"([^"]*)"+/.source,
  /'([^']*)'+/.source,
  /([^\s"'=<>`]+)/.source
]
const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)
const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture)
const startTagClose = /^\s*(\/?)>/

const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/

// 示例模板
let html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>';

// 维护一个 stack 栈来保存已经解析好的标签头
const stack = [];
let currentParent, root;
let index = 0;

// 去除已经解析的部分
function advance(n) {
  index += n
  html = html.substring(n)
}

function parseHTML() {
  console.log(html)
  while(html) {
    let index = html.indexOf('<')
    if(index === 0) {
      // if(html.match(endTag)) {
      //   console.log('endTag')
      //   continue;
      // }
      const endTagMatch = html.match(endTag)
      console.log(endTagMatch)
      if (endTagMatch) {
          console.log('endTag')
          advance(endTagMatch[0].length);
          // 解析结束标签
          parseEndTag(endTagMatch[1]);
          continue;
      }
      if(html.match(startTagOpen)) {
        console.log('startTagOpen')
        // 解析开始标签
        const startTagMatch = parseStartTag();
        // 将 startTagMatch 得到的结果首先封装成 element ，这个就是最终形成的 AST 的节点，标签节点的type 为 1。 
        const element = {
            type: 1,
            tag: startTagMatch.tagName,
            lowerCasedTag: startTagMatch.tagName.toLowerCase(),
            attrsList: startTagMatch.attrs,
            attrsMap: makeAttrsMap(startTagMatch.attrs),
            parent: currentParent,
            children: []
        }

        // 处理“ v‐if”以及“ v‐for”这样的 Vue.js 的表达式
        processIf(element);
        processFor(element);

        // 然后让 root 指向根节点的引用。 
        if(!root){
            root = element
        }
        // 接着我们将当前节点的 element 放入父节点 currentParent 的 children 数组中。
        if(currentParent){
            currentParent.children.push(element);
        }
        // 最后将当前节点 element 压入 stack 栈中，并将 currentParent 指向当前节点，因为接下去下一个解析如果还是头标签或者是文本的话，会成为当前节点的子节点，如果是尾标签的话，那么将会从栈中取出当前节点
        stack.push(element);
        currentParent = element;
        continue;
      }
      console.log('nomatch')
    }else {
      // 解析文本
      // 只需要将文本取出，有两种情况，一种是普通的文本，直接构建一个节点 push 进当前 currentParent 的 children 中即可。还有一种情况是文本是如“{{item}}”这样的Vue.js 的表达式，这时候我们需要用 parseText 来将表达式转化成代码。
      text = html.substring(0, textEnd)
      advance(textEnd)
      let expression;
      if (expression = parseText(text)) {
          currentParent.children.push({
              type: 2,
              text,
              expression
          });
      } else {
          currentParent.children.push({
              type: 3,
              text,
          });
      }
      continue;
    }
  }
}

// 将 attrs 转换成 map 格式的一个方法
function makeAttrsMap (attrs) {
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// 解析起始标签
function parseStartTag() {
  const start = html.match(startTagOpen)
  // 返回第一个匹配到的内容的数组：匹配的子串，匹配到的内容，index:子串在原字符串的偏移量，input:原字符串，groups:捕获组数组
  console.log('start', start)
  if(start) {
    const match = {
      tagName: start[1],
      // 同时我们需要一个数组 attrs 用来存放标签内的属性。
      attrs: [],
      start: index
    }
    advance(start[0].length);
    // 接下来使用 startTagClose 与 attribute 两个正则分别用来解析标签结束以及标签内的属性。这段代码用 while 循环一直到匹配到 startTagClose 为止，解析内部所有的属性。 
    let end, attr
    console.log('attr')
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      console.log('attr', attr)
      advance(attr[0].length)
      match.attrs.push({
          name: attr[1],
          value: attr[3]
      });
    }
    // 标签结束
    if (end) {
      console.log('end', end)
      match.unarySlash = end[1];
      advance(end[0].length);
      match.end = index;
      console.log('match', match)
      return match
    }
  }
}

// 解析结束标签
// 会从 stack 栈中取出最近的跟自己标签名一致的那个元素，将currentParent 指向那个元素，并将该元素之前的元素都从 stack 中出栈。 
function parseEndTag (tagName) {
  let pos;
  for (pos = stack.length - 1; pos >= 0; pos--) {
      if (stack[pos].lowerCasedTag === tagName.toLowerCase()) {
          break;
      }
  }
  if (pos >= 0) {
      stack.length = pos;
      currentParent = stack[pos];  
  }    
}

// 使用一个 tokens 数组来存放解析结果，通过 defaultTagRE 来循环匹配该文本，如果是普通文本直接 push 到 tokens 数组中去，如果是表达式（{{item}}），则转化成“_s(${exp})”的形式。 
function parseText (text) {
  if (!defaultTagRE.test(text)) return;
  const tokens = [];
  let lastIndex = defaultTagRE.lastIndex = 0
  let match, index
  while ((match = defaultTagRE.exec(text))) {
      index = match.index
       
      if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
       
      const exp = match[1].trim()
      tokens.push(`_s(${exp})`)
      lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return tokens.join('+');
}

// 用来从 el 的 attrsMap 属性或是 attrsList 属性中取出 name 对应值。 
function getAndRemoveAttr (el, name) {
  let val
  if ((val = el.attrsMap[name]) != null) {
      const list = el.attrsList
      for (let i = 0, l = list.length; i < l; i++) {
          if (list[i].name === name) {
              list.splice(i, 1)
              break
          }    
      }
  }
  return val
}

function processFor (el) {
  let exp;
  if ((exp = getAndRemoveAttr(el, 'v‐for'))) {
    const inMatch = exp.match(forAliasRE);
    el.for = inMatch[2].trim();
    el.alias = inMatch[1].trim();
  }
}

function processIf (el) {
  const exp = getAndRemoveAttr(el, 'v‐if');
  if (exp) {
      el.if = exp;
      if (!el.ifConditions) {
          el.ifConditions = [];
      }
      el.ifConditions.push({
          exp: exp,
          block: el
      });
  }
}

parseHTML()


