const notfound = async (req, res) => {
    res.status(404).redirect('/error')
}

module.exports = notfound