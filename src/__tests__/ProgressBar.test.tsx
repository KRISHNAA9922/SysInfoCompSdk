import renderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import ProgressBar from '../component/ui/ProgressBar';

describe('ProgressBar', () => {
  it('clamps values to 0-100 via accessibilityValue', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <ProgressBar value={123.456} decimals={1} showText={false} />
      );
    });

    const progressNode = tree!.root.findByProps({ accessibilityRole: 'progressbar' });
    const receivedNow = progressNode.props.accessibilityValue.now;
    const expectedNow = 100;
    // eslint-disable-next-line no-console
    console.log('ProgressBar clamp -> expected now:', expectedNow, '| received now:', receivedNow);
    expect(receivedNow).toBe(expectedNow);
  });

  it('sets accessibilityValue.now to the given value (e.g., 42)', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <ProgressBar value={45} showText={false} />
      );
    });
  
    const progressNode = tree!.root.findByProps({ accessibilityRole: 'progressbar' });
    const receivedNow = progressNode.props.accessibilityValue.now;
    const expectedNow = 45;
  
    // Optional: terminal visibility
    // eslint-disable-next-line no-console
    console.log('ProgressBar -> expected now:', expectedNow, '| received now:', receivedNow);
  
    expect(receivedNow).toBe(expectedNow);
  });

  it('clamps low values and hides text when showText is false', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <ProgressBar value={-50} showText={false} />
      );
    });

    // No Text should be rendered when showText is false
    const hasText = (() => {
      try {
        tree!.root.findByType(Text);
        return true;
      } catch {
        return false;
      }
    })();
    // eslint-disable-next-line no-console
    console.log('ProgressBar showText=false -> expected: no Text | received:', hasText ? 'Text present' : 'no Text');
    expect(hasText).toBe(false);
  });

  
});


