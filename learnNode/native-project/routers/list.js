module.exports = async (res, get, post, files) => {
	let data = await db.query('SELECT * FROM item_table')
	try {
		res.writeJson({
			state: 0,
			data
		})
	} catch (error) {
		res.writeJson({
			state: 1,
			msg: 'database error'
		})
	}
	res.end()
}