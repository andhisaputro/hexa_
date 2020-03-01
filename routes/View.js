module.exports = ({server , app}) => {

    server.get('/', (req, res) => {
        const actualPage = '/login'
        app.render(req, res, actualPage) 
    })

    server.get('/login', (req, res) => {
        const actualPage = '/login'
        app.render(req, res, actualPage) 
    })

    server.get('/register', (req, res) => {
        const actualPage = '/register'
        app.render(req, res, actualPage) 
    })

    server.get('/programs', (req, res) => {
        const actualPage = '/program'
        app.render(req, res, actualPage) 
    })

    
    server.get('/subjects', (req, res) => {
        const actualPage = '/subject'
        app.render(req, res, actualPage) 
    })

    server.get('/classes', (req, res) => {
        const actualPage = '/class'
        app.render(req, res, actualPage) 
    })
    
}