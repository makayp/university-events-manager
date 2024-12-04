import os
import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

resources_folder = Path("resources")
resources_file = Path("resources.py")

# Create the resources directory if it doesn't exist
resources_folder.mkdir(exist_ok=True)

def update_resources_py():
    with resources_file.open('w') as file:
        file.write("# Auto-generated file with paths to JSON test resources\n\n")
        
        for json_file in resources_folder.iterdir():
            if json_file.suffix == '.json':
                var_name = json_file.stem
                file_path = json_file.as_posix()  # Ensures consistent use of forward slashes
                file.write(f'{var_name}_path = "{file_path}"\n')

    print(f"Updated {resources_file.name}")

class ResourcesEventHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith('.json'):
            update_resources_py()

if __name__ == "__main__":
    event_handler = ResourcesEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path=str(resources_folder), recursive=False)
    
    observer.start()
    print(f"Watching for changes in {resources_folder}...")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
