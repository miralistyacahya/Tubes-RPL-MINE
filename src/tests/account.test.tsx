import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, getByText} from '@testing-library/react';
import Account from '@/src/app/account/page';
// import mockRouter from 'next-router-mock';

// jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Account', () => {
  it('renders account component correctly', () => {

    // mockRouter.push("/initial-path");
    render(<Account />);

    expect(screen.getByText(/Daftar Akun/i)).toBeInTheDocument();
  });
}); 
