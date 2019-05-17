const findNumber = async (req, res)=>{
    try {
        let { number, find } = req.body;
        arrNum = number.toString().split("")
        if(arrNum.indexOf(find) >=0){
            res.send(true)
        }else{
            res.send(false)
        }
        
    } catch (err) {
        res.send(err)
    }
}

const dataCtrl = { findNumber };
module.exports = dataCtrl;