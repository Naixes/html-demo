import herolist from './herolist.json';

export default {
  'POST /api/web201605/js/herolist.json': (req, res) => {
    const { ename } = req.body;
    const hero = herolist.filter(item => item.ename === parseInt(ename, 10))[0];
    res.send(hero);
  },
  '/api/herolist.json': herolist
};