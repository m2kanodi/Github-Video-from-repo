const axios = require('axios');
exports.fetchRepositoryData = async (req, res) =>{
    try{
        const {owner , repo} = req.params;
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`)
        const repositoryData = response.data;
        res.json(repositoryData);

    } catch(error){
        console.error('Failed to fetch repository data:', error.message);
    res.status(500).json({ error: 'Failed to fetch repository data' });
    }

}