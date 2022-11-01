import { render, screen } from '@testing-library/react';
import ProfileStatus from './ProfileStatus';

// import App from './App';
describe('ProfileStatus Component', () => {
  test('should be only two Span element', () => {
    render(
      <ProfileStatus
        status="12345qwe"
        editMode={false}
        activateEditMode={() => {}}
        deactivateEditMode={() => {}}
        onStatusChange={() => {}}
        isOwner={true}
      />
    );
    const spans = screen.getAllByText('Status:');
    expect(spans.length).toBe(1);
  });
});
