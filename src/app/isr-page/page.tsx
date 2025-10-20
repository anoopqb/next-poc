
export const revalidate = 10;

const ISRPage = () => {



    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>ISR Page</h1>
            <p>This page is statically generated and updated every 10 seconds.</p>
            <p>Last updated: {new Date().toISOString()}</p>
        </div>
    );
};

export default ISRPage;