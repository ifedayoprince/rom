import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useROMPage } from '../index';
import { TestService } from '../../../service-sample';

describe('useROMPage tests', () => {
  it('should be defined', () => {
    expect(useROMPage).toBeDefined();
  });

  it('renders the hook correctly and checks types', () => {
    const { result } = renderHook(() => useROMPage(axios.create()));
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.success).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('inject a sample service and ensure it returns the correct data', () => {
    const { result } = renderHook(() => useROMPage(axios.create()));

    act(() => {
      const injectResult = result.current.inject(TestService);

      expect(result.current.inject).toBeDefined();
      expect(injectResult).toBeDefined();
      expect(typeof injectResult).toBe('object');
      expect(injectResult.length).toBe(1);

      expect(injectResult[0]).toBeDefined();
      expect(typeof injectResult[0]).toBe('object');
    })
  })

  it('inject a sample service and call a sample method from the service', async () => {
    const { result } = renderHook(() => useROMPage(axios.create()));

    await act(async () => {
      const [testService] = result.current.inject(TestService);
      await (testService as TestService).getData();
    })

    expect(result.current.data).toBeDefined();
    expect(result.current.success).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  })

  it('inject a sample service and call a erroneous method from the service', async () => {
    const { result } = renderHook(() => useROMPage(axios.create()));

    await act(async () => {
      const [testService] = result.current.inject(TestService);
      await (testService as TestService).getErroneousData();
    })

    expect(result.current.data).toBeNull();
    expect(result.current.success).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeDefined();
  })
});
