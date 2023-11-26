// Import the function you want to test
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ngetes jest', () => {
    test('mamtematka ini  benar', () => {
      expect(1+1).toEqual(2);
    });
});

// import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import CartPage from '../CartPage';

// const mockCart = [
//     [1, 'product 1', 1000, 1],
//     [2, 'product 2', 2000, 2]
// ];

// const mockHandleButtonPlusClick = jest.fn();
// const mockHandleButtonMinClick = jest.fn();
// const mockHandleButtonDelClick = jest.fn();
// const mockHandleButtonFailedClick = jest.fn();

// const mockProps = {
//     user: 'test User',
//     currentDate: new Date(),
//     cart: mockCart,
//     cartTotal: 3000,
//     isInitialCart: false,
//     isFailed: false,
//     handleButtonPlusClick: mockHandleButtonPlusClick,
//     handleButtonMinClick: mockHandleButtonMinClick,
//     handleButtonDelClick: mockHandleButtonDelClick,
//     handleButtonFailedClick: mockHandleButtonFailedClick,
// };

// describe ('CartPage', () => {
//     describe ('CartPage Render', () => {
//         it ('should render CartPage correctly', () => {
//             render(<CartPage {...mockProps} />);


//             expect(screen.getByText(/Keranjang/i)).toBeInTheDocument();
//             expect(screen.getByText(/product 1/i)).toBeInTheDocument();
//             expect(screen.getByText(/product 2/i)).toBeInTheDocument();
//         });

//         it('handles button clicks correctly', () => {
//             render(<CartPage {...mockProps} />);
        
//             // Example: Simulate a button click
//             fireEvent.click(screen.getByText(/Pembayaran Gagal/i));
        
//             // Add assertions based on the expected behavior after the button click
//             expect(mockHandleButtonFailedClick).toHaveBeenCalledTimes(1);
//             // Add more assertions for other button clicks
//         });
//     })
// });
