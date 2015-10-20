/**
 * 使用 bootstrap 样式的 html
 */

var generatePageLinks = function(pageCount, page, prePageLink) { 

  var makePageLink = function(i, text) {
    var cls = (i == page) ? ' class="active"' : '';
    var item = '<li' + cls + '>';
    if(!text)
      text = i;

    item += '<a href="' + prePageLink + '?page=' + i + '">' + text + '</a>';
    return item + '</li>';
  }

  var output = '',
      pageStart,
      pageEnd
      ;

  // 小于 5 个直接全部列出来
  if(pageCount < 5) {
    pageStart = 1;
    pageEnd = pageCount;
  }
  else {
    // 开头 3 个
    if(page <= 3) {
      pageStart = 1;
      pageEnd = 5;
    }
    // 末尾 3 个
    else if(page >= (pageCount - 2)) {
      pageStart = pageCount - 4;
      pageEnd = pageCount;
    }
    else {
      pageStart = page - 2;
      pageEnd = page + 2;
    }
  }

  if(page !== 1) {
    output += makePageLink(1, '首页');
  }
  for (var i = pageStart; i <= pageEnd; i++) {
    output += makePageLink(i);
  }
  if(page !== pageCount) {
    output += makePageLink(pageCount, '末页');
  }

  return output;
}

/**
 * 分页组件
 * @param  {int} total    总记录数
 * @param  {int} page     当前页码
 * @param  {int} pageSize 每页记录数
 * @return {string}          返回 html
 */
var bmPagination = function(total, page, pageSize, prePageLink) {
  var pageCount;
  if(!prePageLink)
    prePageLink = '';

  var output = '';

  // 记算总共有多少页
  if( total ) {

     //如果总数据量小于 PageSize，那么只有一页
     if( total < pageSize ){
       pageCount = 1;
     }
     //取总数据量除以每页数的余数
     if( total % pageSize ){                                  
        //如果有余数，则页数等于总数据量除以每页数的结果取整再加一
        pageCount = parseInt(total / pageSize, 10) + 1;           
     }else{
        //如果没有余数，则页数等于总数据量除以每页数的结果
        pageCount = total / pageSize;                       
     }

    // 至少一页才输出翻页按钮
    if(pageCount > 1) {
      output += '<nav><ul class="pagination">';
      output += generatePageLinks(pageCount, page, prePageLink);
      output += '</ul> </nav>';
    }

  }
  return output;
}

module.exports = bmPagination;