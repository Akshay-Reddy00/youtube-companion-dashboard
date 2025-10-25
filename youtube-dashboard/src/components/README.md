# Generic Components - Spotify Style Theme

These reusable components follow a Spotify-inspired design with **black** and **green** color scheme.

## Components

### 1. Button
Two variants available: `primary` (green) and `secondary` (black)

```tsx
import { Button } from './components';

<Button 
  label="Click Me" 
  onClick={handleClick} 
  variant="primary"  // or "secondary"
  className="optional-extra-classes"
/>
```

### 2. InputBox
Styled input field with label

```tsx
import { InputBox } from './components';

<InputBox 
  label="Email"
  placeholder="user@example.com"
  onChange={(e) => setEmail(e.target.value)}
  type="email"  // optional, defaults to "text"
/>
```

### 3. Heading
Large heading text

```tsx
import { Heading } from './components';

<Heading label="Welcome" />
```

### 4. SubHeading
Smaller descriptive text

```tsx
import { SubHeading } from './components';

<SubHeading label="Please enter your details below" />
```

### 5. ErrorMessage
Red error message display

```tsx
import { ErrorMessage } from './components';

{error && <ErrorMessage message={error} />}
```

### 6. SuccessMessage
Green success message display

```tsx
import { SuccessMessage } from './components';

{success && <SuccessMessage message={success} />}
```

### 7. Warning
Text with a link (used for "Already have an account?" type messages)

```tsx
import { Warning } from './components';

<Warning 
  label="Don't have an account?"
  linkText="Sign up"
  to="/register"
/>
```

## Color Scheme

- **Primary Green**: `#10b981` (green-500) - Used for primary actions
- **Black Background**: `#000000` - Main background
- **Dark Gray**: `#18181b` (zinc-900) - Card backgrounds
- **Border**: `#27272a` (gray-800/zinc-800)
- **Text**: White/Gray variations

## Complete Example

See `ExampleUsage.tsx` for a full working example.

## Import All at Once

```tsx
import { 
  Button, 
  InputBox, 
  Heading, 
  SubHeading, 
  ErrorMessage, 
  SuccessMessage, 
  Warning 
} from './components';
```

