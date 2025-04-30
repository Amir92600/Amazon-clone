import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { ProductProvider, useProductContext } from '../context/ProductContext';

// Mock the ProductContext
vi.mock('../context/ProductContext', async () => {
  const actual = await vi.importActual('../context/ProductContext');
  return {
    ...actual,
    useProductContext: vi.fn(),
  };
});

describe('SearchBar Component', () => {
  const mockSearchFn = vi.fn();
  const mockFetchSuggestions = vi.fn();
  const mockClearSuggestions = vi.fn();
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    (useProductContext as any).mockReturnValue({
      suggestions: ['iphone case', 'iphone charger', 'iphone screen protector'],
      isLoading: false,
      fetchSuggestions: mockFetchSuggestions,
      clearSuggestions: mockClearSuggestions
    });
  });
  
  it('renders correctly', () => {
    render(<SearchBar onSearch={mockSearchFn} />);
    
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  
  it('handles input changes', () => {
    render(<SearchBar onSearch={mockSearchFn} />);
    
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'iphone' } });
    
    expect(input).toHaveValue('iphone');
    expect(mockFetchSuggestions).toHaveBeenCalledWith('iphone');
  });
  
  it('shows suggestions when input is focused', async () => {
    render(<SearchBar onSearch={mockSearchFn} />);
    
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'iphone' } });
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText('iphone case')).toBeInTheDocument();
      expect(screen.getByText('iphone charger')).toBeInTheDocument();
      expect(screen.getByText('iphone screen protector')).toBeInTheDocument();
    });
  });
  
  it('submits search on form submit', () => {
    render(<SearchBar onSearch={mockSearchFn} />);
    
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'iphone' } });
    
    const form = input.closest('form');
    fireEvent.submit(form!);
    
    expect(mockSearchFn).toHaveBeenCalledWith('iphone');
  });
  
  it('clears input when clear button is clicked', async () => {
    render(<SearchBar onSearch={mockSearchFn} />);
    
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'iphone' } });
    
    // The clear button should now be visible
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(mockClearSuggestions).toHaveBeenCalled();
  });
});