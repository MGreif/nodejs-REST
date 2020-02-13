const xhrSendRequest = (url,body={},cb=()=>{})=> {
    try{

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                cb(xhr)
            }
        };
        xhr.send(JSON.stringify(body));
    }catch(ex){
        console.error(ex.message)
    }
}

export {xhrSendRequest}