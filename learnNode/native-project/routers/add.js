module.exports = async (res, get, post, files) => {
	let {title, price, count} = get
	if(!title || !price || !count) {
		res.writeJson({
			state: 1,
			msg: 'params invaild : missing params'
		})
		res.end()
	}else {
		price = Number(price)
		count = Number(count)
		if(isNaN(price) || isNaN(count)) {
			res.writeJson({
				state: 1, 
				msg: 'params invaild : invaild params'
			})
		}else {
			try {
				// 注意防止注入
				await db.query(`INSERT INTO item_table (title, price, count) VALUES (?, ?, ?)`, [title, price, count])
				res.writeJson({
					state: 0,
					msg: 'success'
				})
				res.end()
			} catch (error) {
				res.writeJson({
					state: 1,
					msg: 'database error'
				})
			}
		}
	}
	res.end()
}