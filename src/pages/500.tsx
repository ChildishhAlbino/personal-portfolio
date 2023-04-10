function ErrorPage() {
    return (
        <>
            <section className={'min-h-full p-4 grid place-content-center'}>
                <div className='prose text-res-title-xl text-center'>
                    <h1 className='m-0'>500</h1>
                    <small>Navigated page threw an uncaught error</small>
                </div>
            </section>
        </>
    )
}

export default ErrorPage
