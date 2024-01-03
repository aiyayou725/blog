const express = require("express")
const router = express.Router()
const { db, genid } = require("../db/DbUtils")

// 根据关键字或分类，分页，页码信息查询文章
router.get("/search", async (req, res) => {
    /**
     * keyword 关键字
     * categoryId 分类编号
     * 
     * 分页：
     * page 页码
     * pageSize 分页大小
     * 
     */
    let { keyword, categoryId, page, pageSize } = req.query

    page = page == null ? 1 : page;
    pageSize = pageSize == null ? 10 : pageSize
    categoryId = categoryId == null ? 0 : categoryId
    keyword = keyword == null ? "" : keyword

    let params = []
    let whereSqls = []
    if (categoryId != 0) {
        whereSqls.push(" `category_id` = ? ")
        params.push(categoryId)
    }

    if (keyword != "") {
        whereSqls.push(" (`title` LIKE ? OR `content` LIKE ?) ")
        params.push("%" + keyword + "%")
        params.push("%" + keyword + "%")
    }

    let whereSqlStr = ""
    if (whereSqls.length > 0) {
        whereSqlStr = " WHERE " + whereSqls.join(" AND ")
    }

    //查分页数据
    let searchSql = " SELECT `id`,`category_id`,`create_time`,`title`,substr(`content`,0,50) AS `content` FROM `blog` " + whereSqlStr + " ORDER BY `create_time` DESC LIMIT ?,? "
    // 1 10  2,10    3,5
    // 0,10  10,10   10,5
    let searchSqlParams = params.concat([(page - 1) * pageSize, pageSize])

    //查询数据总数
    let searchCountSql = " SELECT count(*) AS `count` FROM `blog` " + whereSqlStr;
    let searchCountParams = params

    //分页数据
    let searchResult = await db.async.all(searchSql, searchSqlParams)
    let countResult = await db.async.all(searchCountSql, searchCountParams)

    console.log(searchSql, countResult)

    if (searchResult.err == null && countResult.err == null) {
        res.send({
            code: 200,
            msg: "查询成功",
            data: {
                keyword,
                categoryId,
                page,
                pageSize,
                rows: searchResult.rows,
                count: countResult.rows[0].count
            }
        })

    } else {
        res.send({
            code: 500,
            msg: "查询失败",
        })
    }

})

// 添加博客文章
router.post("/_token/add", async (req, res) => {
    let { title, categoryId, content } = req.body
    let create_time = update_time = new Date().getTime()

    const insert_sql = "INSERT INTO `blog`(`id`, `title`, `category_id`, `content`, `create_time`, `update_time`) VALUES (?,?,?,?,?,?)" 
    let params = [genid.NextId(), title, categoryId, content, create_time, update_time]

    let { err, rows } = await db.async.run(insert_sql, params)

    if (err === null) {
        res.send({
            code: 200,
            msg: "添加文章成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "添加博客文章失败"
        })
    }
})

// 修改博客
router.put("/_token/update", async (req, res) => {
    let { id, title, categoryId, content } = req.body
    let update_time = new Date().getTime()

    const update_sql = "UPDATE `blog` SET `title` = ?, `content` = ?, `category_id` = ?, `update_time` = ? WHERE `id` = ?"
    let params = [title, content, categoryId, update_time, id]
    let { err, rows } = await db.async.run(update_sql, params)

    if (err === null) {
        res.send({
            code: 200,
            msg: "文章修改成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "文章修改失败"
        })
    }
})

// 删除文章接口
router.delete("/_token/delete", async (req, res) => {
    let id = req.query.id
    const delete_sql = "DELETE FROM `blog` WHERE `id` = ?"
    let { err, rows } = await db.async.run(delete_sql, [id])

    if (err === null) {
        res.send({
            code: 200,
            msg: "删除文章成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "删除文章失败"
        })
    }

})

module.exports = router





