//函数功能 把form表单转化成对象
function serilizeToJSON(form) {
    let result = {};
    let arr = form.serializeArray();
    arr.forEach((item) => {
        result[item.name] = item.value;
    })
    return result;
}