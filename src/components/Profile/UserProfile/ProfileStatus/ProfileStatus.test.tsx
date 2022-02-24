import { render, screen } from '@testing-library/react';
import ProfileStatus from './ProfileStatus';
import ProfileStatusContainer from './ProfileStatusContainer';
// import App from './App';
describe('ProfileStatus Component', () => {
  test('should be only one Span element', () => {
    const { container } = render(<ProfileStatus status="12345qwe" editMode={false} activateEditMode={() => { }} deactivateEditMode={() => { }} onStatusChange={()=>{}}/>);
    const span = container.querySelectorAll('span')
    expect(span.length).toBe(1);
  });
})
