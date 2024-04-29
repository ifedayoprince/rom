import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useROMApp } from '../index';
import { TestService } from '../../../service-sample';


describe('useROMApp tests', () => {

  beforeEach(() => {
    const { result: _ } = renderHook(() => useROMApp())
  })
  afterEach(() => { cleanup() })


  it('should be defined', () => {
    expect(useROMApp).toBeDefined();
  });

  it('renders the hook correctly and checks types', () => {
    const { result } = renderHook(() => useROMApp());
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.success).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('inject a sample service and ensure it returns the correct data', () => {
    const { result } = renderHook(() => useROMApp());

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
    const { result } = renderHook(() => useROMApp());

    await act(async () => {
      const [testService] = result.current.inject(TestService);
      await (testService as TestService).getData();
    })

    console.log("dsd", result.current.data);
    expect(result.current.data).toBeDefined();
    expect(typeof result.current.data).toBe('object');
    expect(result.current.data.length).toStrictEqual(100);
    expect(result.current.success).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();

  })

  it('inject a sample service and call a erroneous method from the service', async () => {
    const { result } = renderHook(() => useROMApp());

    await act(async () => {
      const [testService] = result.current.inject(TestService);
      await (testService as TestService).getErroneousData();
    })

    expect(result.current.data).toBeNull();
    expect(result.current.success).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeDefined();
  })

  it('creates two hooks and ensure data persists among them', async () => {
    const { result: result1 } = renderHook(() => useROMApp());
    const { result: result2 } = renderHook(() => useROMApp());

    await act(async () => {
      const [testService] = result1.current.inject(TestService);
      await (testService as TestService).getErroneousData();
    })

    expect(result1.current.data).toStrictEqual(result2.current.data);
    expect(result1.current.success).toStrictEqual(result2.current.success);
    expect(result1.current.isLoading).toStrictEqual(result2.current.isLoading);
  })
});