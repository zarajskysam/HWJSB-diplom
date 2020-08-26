import { response } from "express";

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let resultXhr;
    let resultError;
    if (options.method === 'GET') {
        const xhr = new XMLHttpRequest();
        xhr.open( 'GET', options.url + '?mail=' + options.data.email + '&password=' + options.data.password );
        try {
            xhr.send();
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200){
                    resultXhr = xhr.responseText;
                    resultError = null; 
                    options.withCredentials = true;
                    options.callback = (resultXhr, resultError)=>{ 
                        console.log(resultError);
                        console.log(resultXhr);
                    }
                }
            }
        }
        catch(err) {
            resultError = err;
            resultXhr = null;
            options.callback = (resultXhr, resultError)=>{
                console.log(resultError);
            };
        }
    } else {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append( 'mail', options.data.mail );
        formData.append( 'password', options.data.password );

        xhr.open( options.method , options.url);
        try {
            xhr.send( formData );
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200){
                    resultXhr = xhr.responseText;
                    resultError = null;
                    options.withCredentials = true; 
                    options.callback = (resultXhr, resultError)=>{
                        console.log(resultError);
                        console.log(resultXhr);
                    }
                }
            }
        } catch (err) {
            resultError = err;
            resultXhr = null;
            options.callback = (resultXhr, resultError)=>{
                console.log(resultError);
            };
        }
       
    }
}