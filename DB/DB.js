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
    //Project
    insertProject: async function (proj, files) {
        try {
            const SQL = `INSERT into Project values (?, ?, ?, ?, ?, ?)`
            const secSQL = `insert into Project_uploaded VALUES ((select ID from Project where title=? and description=? and start=? and finish=? and link=?), ?, ?)`
            const params = ['0', proj.title, proj.description, proj.start, proj.finish, proj.link]
            let params2 = [proj.title, proj.description, proj.start, proj.finish, proj.link]
            
            const connection = await pool.connection();
            await connection.query(SQL, params)
            console.log("Success insertProject!!")
            if(files.length > 0) {
                for(let i = 0; i < files.length; i++) {
                    params2.push(files[i].filename)
                    params2.push(files[i].originalname)
                    await connection.query(secSQL, params2)
                    console.log("Success insertFile!!!!!")
                    params2.pop()
                    params2.pop()
                }
            }
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertProject.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteProject: async function (index) {
        try {
            const SQL = `delete from Project where ID=?`
            const secSQL = `delete from Project_uploaded where proj_ID=?`
            const param = Number(index)
            const connection = await pool.connection();
            await connection.query(secSQL, param)
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
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectProject!!")
            console.log(res)
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed selectProject.... xxxxxxxxxxxxxxxxxxxx')
        }
    },

    //Excularity_Activities
    insertExAc: async function (exac) {
        try {
            const SQL = `insert into Ex_Ac values (?, ?, ?, ?, ?, ?)`
            const params = ['0', exac.title, exac.host, exac.start, exac.finish, exac.awarded]
            const connection = await pool.connection()
            let [res] = await connection.query(SQL, params)
            console.log ("Success insertExAc!!")
            connection.release()
            console.log(res.insertId)
            return res.insertId
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertExAc.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteExAc: async function (index) {
        try {
            const SQL = `delete from Ex_Ac where ID=?`
            const param = Number(index)
            const connection = await pool.connection()
            await connection.query(SQL, param)
            console.log("Success deleteExAc!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed deleteExAc.... xxxxxxxxxxxxxxxx')
        }
    },
    updateExAc: async function (params, condition = {}) {
        try {
            const SQL = `update Ex_Ac `
            //Set param
            let setDict = DictionarytoArrayforDB(params)
            SQL += `set ` + setDict.SQL
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            await connection.query(SQL, setDict.value.concat(whereDict.value))
            console.log("Success updateExAc!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed updateExAc.... xxxxxxxxxxxxxxxx')
        }
    },
    selectExAc: async function (condition={}) {
        try {
            let SQL = `select * from Ex_Ac ` 
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectExAc!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed selectExAc.... xxxxxxxxxxxxxxxx')
        }
    },

    //Career
    insertCareer: async function (crr) {
        try {
            const SQL = `INSERT into Career values (?, ?, ?, ?, ?, ?, ?)`
            const params = ['0', crr.comp_name, crr.start, crr.finish, crr.department, crr.responsibilities, crr.certificate]
            const connection = await pool.connection();
            await connection.query(SQL, params)
            console.log("Success insertCareer!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertCareer.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteCareer: async function (index) {
        try {
            const SQL = `delete from Career where ID=?`
            const param = Number(index)
            const connection = await pool.connection();
            await connection.query(SQL, param)
            console.log("Success deleteCareer!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed deleteCareer.... xxxxxxxxxxxxxxxxxxxxxx')
        }
    },
    updateCareer: async function (params, condition = {}) {
        try {
            let SQL = `update Career ` 
            //Set param
            let setDict = DictionarytoArrayforDB(params)
            SQL += `set ` + setDict.SQL
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            await connection.query(SQL, setDict.value.concat(whereDict.value))
            console.log("Success updateCareer!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed updateCareer.... xxxxxxxxxxxxxxxxxxxx')
        }
    },
    selectCareer: async function (condition={}) {
        try {
            let SQL = `select * from Career `
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectCareer!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed selectProject.... xxxxxxxxxxxxxxxxxxxx')
        }
    },

    //Technical_Qualification
    insertTeQu: async function (teq) {
        try {
            const SQL = `INSERT into Technical_Qualification values (?, ?, ?, ?)`
            const params = [teq.name, teq.host, teq.acquisition_date, teq.certificate]
            const connection = await pool.connection();
            await connection.query(SQL, params)
            console.log("Success insertTeQu!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertTeQu.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteTeQu: async function (condition = {}) {
        try {
            const SQL = `delete from Technical_Qualification where NAME=? and HOST=?`
            const param = [condition.NAME, condition.HOST]
            console.log(param)
            const connection = await pool.connection();
            await connection.query(SQL, param)
            console.log("Success deleteTeQu!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed deleteTeQu.... xxxxxxxxxxxxxxxxxxxxxx')
        }
    },
    updateTeQu: async function (params, condition = {}) {
        try {
            let SQL = `update Technical_Qualfication `
            //Set param
            let setDict = DictionarytoArrayforDB(params)
            SQL += `set ` + setDict.SQL
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            await connection.query(SQL, setDict.value.concat(whereDict.value))
            console.log("Success updateTeQu!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed updateTeQu.... xxxxxxxxxxxxxxxxxxxx')
        }
    },
    selectTeQu: async function (condition={}) {
        try {
            let SQL = `select * from Technical_Qualification `
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectTeQu!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed selectTeQu.... xxxxxxxxxxxxxxxxxxxx')
        }
    },

    //Language_Certification
    insertLaCe: async function (lac) {
        try {
            const SQL = `INSERT into Language_Certification values (?, ?, ?, ?, ?, ?)`
            const params = ['0', lac.name, lac.host, lac.score, lac.acquisition_date, lac.certificate]
            const connection = await pool.connection();
            await connection.query(SQL, params)
            console.log("Success insertLaCe!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertLaCe.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteLaCe: async function (index) {
        try {
            const SQL = `delete from Language_Certification where ID=?`
            const param = Number(index)
            const connection = await pool.connection();
            await connection.query(SQL, param)
            console.log("Success deleteLaCe!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed deleteLaCe.... xxxxxxxxxxxxxxxxxxxxxx')
        }
    },
    updateLaCe: async function (params, condition = {}) {
        try {
            let SQL = `update Language_Certification `
            //Set param
            let setDict = DictionarytoArrayforDB(params)
            SQL += `set ` + setDict.SQL
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            await connection.query(SQL, setDict.value.concat(whereDict.value))
            console.log("Success updateLaCe!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed updateLaCe.... xxxxxxxxxxxxxxxxxxxx')
        }
    },
    selectLaCe: async function (condition={}) {
        try {
            let SQL = `select * from Language_Certification `
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectLaCe!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed selectLaCe.... xxxxxxxxxxxxxxxxxxxx')
        }
    },

    //Education
    insertEducation: async function(con) {
        try {
            
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxx Failed insertEducation.... xxxxxxxxxxxxxxxxxxxxxx')
        }
    },

    //Contact
    insertContact: async function (con) {
        try {
            const SQL = `INSERT into Contact values (?, ?, ?)`
            const params = ['0', con.category, con.detail]
            const connection = await pool.connection();
            await connection.query(SQL, params)
            console.log("Success insertContact!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed insertContact.... xxxxxxxxxxxxxxxx')
        }
    },
    deleteContact: async function (index) {
        try {
            const SQL = `delete from Contact where ID=?`
            const param = Number(index)
            const connection = await pool.connection();
            await connection.query(SQL, param)
            console.log("Success deleteContact!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxx Failed deleteContact.... xxxxxxxxxxxxxxxxxxxxxx')
        }
    },
    updateContact: async function (params, condition = {}) {
        try {
            let SQL = `update Contact `
            //Set param
            let setDict = DictionarytoArrayforDB(params)
            SQL += `set ` + setDict.SQL
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            const connection = await pool.connection();
            await connection.query(SQL, setDict.value.concat(whereDict.value))
            console.log("Success updateContact!!")
            connection.release()
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed updateContact.... xxxxxxxxxxxxxxxxxxxx')
        }
    },
    selectContact: async function (condition={}) {
        try {
            let SQL = `select * from Contact `
            //Where conditions
            let whereDict = DictionarytoArrayforDBCondition(condition)
            if(whereDict.value.length > 0) SQL += `where ` + whereDict.SQL
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, whereDict.value)
            connection.release()
            console.log("Success selectContact!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxxxxxxxxx Failed selectContact.... xxxxxxxxxxxxxxxxxxxx')
        }
    },

    selectProjectDetail: async function (condition={}) {
        try {
            let SQL = `select * from Project as P left join Project_uploaded as Pu on P.ID = Pu.proj_ID where P.ID=?`
            let params = [condition.ID]
            
            //Where conditions
            console.log(SQL)
            const connection = await pool.connection();
            let [res] = await connection.query(SQL, params)
            connection.release()
            console.log("Success selectUploaded!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxx Failed selectUploaded.... xxxxxxxxxxxxxxxxxxxxx')
        }
    },

    selectEx_AcDetail: async function (condition={}) {
        try {
            let SQL = `select * from Ex_Ac as E left join (select P.ID as Pro_ID, title as Pro_title, link as Pro_link, exac_ID from Project as P join Ex_Ac_rel_Project as rel on P.ID = rel.proj_ID where rel.exac_ID = ?) as RelP on exac_ID = E.ID`
            const connection = await pool.connection()
            let params = [condition.ID]
            let [res] = await connection.query(SQL, params)
            connection.release()
            console.log("Success selectEx_AcDetail!!")
            console.log(res[0])
            return res
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxx Failed selectEx_AcDetail.... xxxxxxxxxxxxxxxxxxxxx')
        }
    },

    insertRelProject: async function (exc) {
        try {
            let SQL = `insert into Ex_Ac_rel_Project values(?, ?)`
            let params = [exc.exac_ID]
            const connection = await pool.connection();
            for (let i = 0; i < exc.proj_ID.length; i++) {
                params.push(exc.proj_ID[i])
                await connection.query(SQL, params)
                params.pop()
            }
            connection.release()
            console.log("Success insertRelProject!!!!")
        } catch (e) {
            console.error(e)
            console.log('xxxxxxxxxxxxxx Failed insertRelProject.... xxxxxxxxxxxxxxxxxxx')
        }
    }
}
