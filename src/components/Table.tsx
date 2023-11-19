export default function Table() {
    return (
        <div className="flexCenter relative overflow-x-auto shadow-md sm:rounded-lg mx-16">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-white text-center">
                    <tr>
                        <th scope="col" className="px-4 py-3 bold-14">
                        Product name
                        </th>
                        <th scope="col" className="px-4 py-3 bold-14">
                        Color
                        </th>
                        <th scope="col" className="px-4 py-3 bold-14">
                        Category
                        </th>
                        <th scope="col" className="px-4 py-3 bold-14">
                        Price
                        </th>
                        <th scope="col" className="px-4 py-3 bold-14">
                        Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg_row_blue even:bg-white border-b text-center">
                        <th scope="row" className="px-4 py-3 medium-14" style={{ maxWidth: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        Apple MacBook Pro Apple MacBook Pro Apple MacBook Pro Apple MacBook Pro Apple MacBook Pro
                        </th>
                        <td className="px-4 py-3 medium-14">
                        Silver
                        </td>
                        <td className="px-4 py-3 medium-14">
                        Laptop
                        </td>
                        <td className="px-4 py-3 medium-14">
                        $2999
                        </td>
                        <td className="px-4 py-3 medium-14">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg_row_blue even:bg-white border-b">
                        <th scope="row" className="px-4 py-3 medium-14 whitespace-nowrap overflow-hidden overflow-ellipsis w-40">
                        Microsoft Surface Pro
                        </th>
                        <td className="px-4 py-3 medium-14">
                        White
                        </td>
                        <td className="px-4 py-3 medium-14">
                        Laptop PC
                        </td>
                        <td className="px-4 py-3 medium-14">
                        $1999
                        </td>
                        <td className="px-4 py-3 medium-14">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg_row_blue even:bg-white border-b">
                        <th scope="row" className="px-4 py-3 medium-14 whitespace-nowrap overflow-hidden overflow-ellipsis w-40">
                        Microsoft Surface Pro
                        </th>
                        <td className="px-4 py-3 medium-14">
                        White
                        </td>
                        <td className="px-4 py-3 medium-14">
                        Laptop PC
                        </td>
                        <td className="px-4 py-3 medium-14">
                        $1999
                        </td>
                        <td className="px-4 py-3 medium-14">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg_row_blue even:bg-white border-b">
                        <th scope="row" className="px-4 py-3 medium-14 whitespace-nowrap overflow-hidden overflow-ellipsis w-40">
                        Microsoft Surface Pro
                        </th>
                        <td className="px-4 py-3 medium-14">
                        White
                        </td>
                        <td className="px-4 py-3 medium-14">
                        Laptop PC
                        </td>
                        <td className="px-4 py-3 medium-14">
                        $1999
                        </td>
                        <td className="px-4 py-3 medium-14">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr className="odd:bg_row_blue even:bg-white border-b">
                        <th scope="row" className="px-4 py-3 medium-14 whitespace-nowrap overflow-hidden overflow-ellipsis w-40">
                        Microsoft Surface Pro
                        </th>
                        <td className="px-4 py-3 medium-14">
                        White
                        </td>
                        <td className="px-4 py-3 medium-14">
                        Laptop PC
                        </td>
                        <td className="px-4 py-3 medium-14">
                        $1999
                        </td>
                        <td className="px-4 py-3 medium-14">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}