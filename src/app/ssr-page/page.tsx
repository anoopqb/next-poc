const SSRPage = async () => {

    const data = await fetch(`https://romantic-wealth-03592779c1.strapiapp.com/api/articles/?populate=*`, {
        cache: 'no-store'
    })
    const articles = await data.json()
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p>Last updated: {new Date().toISOString()}</p>
            {articles.data.map((article: any) => (
                <div key={article.id} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md p-4 mb-4">
                    <h1 className="text-2xl font-bold">{article.title}</h1>
                    <p className="text-gray-500">{article.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SSRPage