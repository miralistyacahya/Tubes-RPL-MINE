// import '@testing-library/jest-dom';

// describe('ngetes jest', () => {
//     test('mamtematka ini  benar', () => {
//       expect(1+1).toEqual(2);
//     });
// });

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createClient } from '@/src/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Account from '@/src/app/account/page';

jest.mock('@/src/utils/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('Account', () => {
  it('renders account component correctly', () => {
    render(<Account />);
    expect(screen.getByText(/Daftar Akun/i)).toBeInTheDocument();
  });
});
