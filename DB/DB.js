//사용할 SQL문들 코딩부
const pool = require('./config')

function DictionarytoArrayforDB(Dict) {
    let lastestkey = Object.keys(Dict)[Object.keys(Dict).length - 1]
    let res = {SQL: ``, value: []}
    for (key in Dict) {
        res.value[res.value.length] = Dict[key]
        if(key === lastestkey) {
            res['SQL'] = res['SQL'] + key + `=? `
            break;
        }
        res['SQL'] = res['SQL'] + key + `=?, `
    }
    return res
}

function DictionarytoArrayforDBCondition(Dict) {
    let lastestkey = Object.keys(Dict)[Object.keys(Dict).length - 1]
    let res = {SQL: ``, value: []}
    for (key in Dict) {
        res.value[res.value.length] = Dict[key]
        if(key === lastestkey) {
            res['SQL'] = res['SQL'] + key + `=? `
            break;
        }
        res['SQL'] = res['SQL'] + key + `=? and `
    }
    return res
}

module.exports = {
    insertProject: async function (proj) {
        try {
            const SQL = `INSERT into Project values (?, ?, ?, ?, ?, ?)`
            const params = ['0', proj.title, proj.description, proj.start, proj.finish, proj.link]
            const connection = await pool.connection();
            await connection.query(SQL, params)
            console.log("Success insertProject!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertProject.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteProject: async function (index) {
        try {
            const SQL = `delete from Project where ID=?`
            const param = Number(index)
            const connection = await pool.connection();
            await connection.query(SQL, param)
            console.log("Success deleteProject!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed deleteProject.... xxxxxxxxxxxxxxxxxxxxxx')
        }
    },
    updateProject: async function (params, condition = {}) {
        try {
            let SQL = `update Project `
            //Set param
            let setDict = DictionarytoArrayforDB(params)
            SQL += `set ` + setDict.SQL
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            await connection.query(SQL, setDict.value.concat(whereDict.value))
            console.log("Success updateProject!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed updateProject.... xxxxxxxxxxxxxxxxxxxx')
        }
    },
    selectProject: async function (condition={}) {
        try {
            let SQL = `select * from Project `
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectProject!!")
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed selectProject.... xxxxxxxxxxxxxxxxxxxx')
        }
    }
}