import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Cart from '@/src/app/cart/page';

describe('Cart', () => {
  it('renders cart component correctly', () => {
    // ARRANGE
    render(<Cart />);

    // ACT
    const header = screen.getByText('Daftar Produk', { selector: 'h1' });

    // ASSERT
    expect(header).toBeInTheDocument();
  });

  it('renders search bar correctly', () => {
    // ARRANGE
    render(<Cart />);

    // ACT
    const searchBar = screen.getByPlaceholderText('Cari produk dengan nama...');

    // ASSERT
    expect(searchBar).toBeInTheDocument();
  });

  it('fires search and keypress events correctly', () => {
    // ARRANGE
    render(<Cart />);

    // ACT
    const searchBar = screen.getByPlaceholderText('Cari produk dengan nama...') as HTMLInputElement;
    act(() => {
      fireEvent.change(searchBar, { target: { value: 'Test Product' } });
    });

    // ASSERT
    expect(searchBar.value).toBe('Test Product');
    // Add more assertions based on your specific logic for handling search events
  });

  it('renders table correctly with no mock data', () => {
    // ARRANGE
    render(<Cart />);

    // ACT
    const message = screen.getByText('Tidak ada produk');

    // ASSERT
    expect(message).toBeInTheDocument();
  });

}); 
