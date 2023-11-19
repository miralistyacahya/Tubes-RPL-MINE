export default function ActionButton(){
    return(
        <div className="p-2 flex justify-center space-x-4">
            <button className="btn btn-info btn-sm">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6001 4H4.6001C4.06966 4 3.56096 4.21071 3.18588 4.58579C2.81081 4.96086 2.6001 5.46957 2.6001 6V20C2.6001 20.5304 2.81081 21.0391 3.18588 21.4142C3.56096 21.7893 4.06966 22 4.6001 22H18.6001C19.1305 22 19.6392 21.7893 20.0143 21.4142C20.3894 21.0391 20.6001 20.5304 20.6001 20V13" stroke="#295F9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.1001 2.49998C19.4979 2.10216 20.0375 1.87866 20.6001 1.87866C21.1627 1.87866 21.7023 2.10216 22.1001 2.49998C22.4979 2.89781 22.7214 3.43737 22.7214 3.99998C22.7214 4.56259 22.4979 5.10216 22.1001 5.49998L12.6001 15L8.6001 16L9.6001 12L19.1001 2.49998Z" stroke="#295F9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button className="btn btn-error btn-sm">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.6001 6H5.6001H21.6001" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.6001 6V4C8.6001 3.46957 8.81081 2.96086 9.18588 2.58579C9.56096 2.21071 10.0697 2 10.6001 2H14.6001C15.1305 2 15.6392 2.21071 16.0143 2.58579C16.3894 2.96086 16.6001 3.46957 16.6001 4V6M19.6001 6V20C19.6001 20.5304 19.3894 21.0391 19.0143 21.4142C18.6392 21.7893 18.1305 22 17.6001 22H7.6001C7.06966 22 6.56096 21.7893 6.18588 21.4142C5.81081 21.0391 5.6001 20.5304 5.6001 20V6H19.6001Z" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.6001 11V17" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.6001 11V17" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    );
}
