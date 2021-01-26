const app = require('./app')
require('./database')

async function init(){
    await app.listen(process.env.PORT||3001);
    console.log(`Server on port 3001`)
    
}
 
init()