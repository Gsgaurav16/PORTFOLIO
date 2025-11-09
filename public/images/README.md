# Images Folder

Place your robot character image file here.

## How to use:

1. **Add your robot character image file** to this folder with the name `robot-character.png`
   - Supported formats: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`
   - If using a different name or format, update the path in the components

2. **The code is already configured** to use the image:
   - Hero section: `src/components/Hero.jsx` (line 106)
   - About section: `src/components/About.jsx` (line 99)

3. **If you need to change the image path**, update both components:
   ```jsx
   <RobotCharacter className="w-full h-full max-w-xs" imageSrc="/images/your-image-name.png" />
   ```

**Note:** The component will automatically use the image file instead of the SVG when `imageSrc` is provided. If the image file is not found, it will fall back to the SVG illustration.

