module.exports = function(RED) {
    "use strict";
    const axios = require('axios');
    const FormData = require('form-data');
    function LowerCaseNode(config) {

        RED.nodes.createNode(this,config);
        const node = this;

        //event "input" si scatena quando parte il flusso
        node.on('input', async function (msg, nodeSend, nodeDone) {

            
            const { configuration } = msg?.payload || {}
            /*const tenant= 'e52afdaf-fc0f-4b2d-b86f-0b32d9a9f07e';// $("#node-input-tenant").val();
            const tokenURL = 'https://login.microsoftonline.com/'+tenant+'/oauth2/V2.0/token';
            const grantType = 'client_credentials';
            const clientID = '49ff1b00-3c36-4ac8-bc31-f335f81f64cd';//$("#node-input-clientID").val();
            const clientSecret = 'g4c8Q~2bxjSp2GJSIaqAgqLKngTakqw4AAti3a2W';// $("#node-input-clientSecret").val();
            //db local*/
            console.log('input:::bc365::::configuration::', configuration);

            const data = new FormData();
            data.append('client_id', configuration.client_id);
            data.append('client_secret', configuration.client_secret);
            data.append('grant_type', configuration.grant_type);
            data.append('scope', configuration.scope);
            data.append('tenant', configuration.tenant);
            data.append('code', configuration.code);
            data.append('redirect_uri', configuration.redirect_uri);
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://login.microsoftonline.com/e52afdaf-fc0f-4b2d-b86f-0b32d9a9f07e/oauth2/v2.0/token',
                headers: { 
                    ...data.getHeaders()
                },
                data
            };
            try {
             const response = await axios.request(config);
             console.log('response:::', response.data);
             msg.payload= response.data;
             console.log('TOKEN_____: ',msg.payload.access_token)

            } catch (error) {
                alert('error::oauth request token')
            }

            
            node.send(msg);
        

           return msg;
        });


   
               
    }

    RED.nodes.registerType("lower-case",LowerCaseNode);
       
}