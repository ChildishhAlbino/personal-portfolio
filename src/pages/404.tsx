function NotFoundPage() {
    return (
        <>
            <section className={'min-h-full p-4 grid place-content-center'}>
                <div className='prose text-[clamp(1rem,10vw,4rem)] text-center'>
                    <h1 className='m-0'>404</h1>
                    <small>Page not found</small>
                </div>
            </section>
        </>
    )
}

export default NotFoundPage
