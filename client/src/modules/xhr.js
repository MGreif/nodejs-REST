const xhrSendRequest = (method="POST",url,body={},cb=()=>{})=> {
    try{
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                cb(xhr.response)
            }
        };
        xhr.send(JSON.stringify(body));
    }catch(ex){
        console.error(ex.message)
    }
}

export {xhrSendRequest}