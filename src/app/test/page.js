import prisma from '../../../lib/prisma';

const Blog = async() => {
    const feed = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true },
          },
        },
    });

    return (
        <>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                {feed.map((post) => (
                    <div key={post.id} className="post">
                    <p>{post.title} - {post.content} by {post.author.name}</p>
                    </div>
                ))}
                </main>
            </div>
            <style>{`
                .post {
                // background: white;
                transition: box-shadow 0.1s ease-in;
                }

                .post:hover {
                box-shadow: 1px 1px 3px #aaa;
                }

                .post + .post {
                margin-top: 2rem;
                }
            `}</style>
        </>
    )
}

export default Blog