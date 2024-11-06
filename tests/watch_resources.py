import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

resources_folder = "resources"
resources_file = "resources.py"

os.makedirs(resources_folder, exist_ok=True)

def update_resources_py():
    with open(resources_file, 'w') as file:
        file.write("# Auto-generated file with paths to JSON test resources\n\n")
        
        for json_file in os.listdir(resources_folder):
            if json_file.endswith('.json'):
                var_name = os.path.splitext(json_file)[0]
                file_path = os.path.join(resources_folder, json_file).replace("\\", "/")
                file.write(f'{var_name}_path = "{file_path}"\n')

    print(f"Updated {resources_file}")

class ResourcesEventHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith('.json'):
            update_resources_py()

    def on_created(self, event):
        if event.src_path.endswith('.json'):
            update_resources_py()
            
    def on_deleted(self, event):
        if event.src_path.endswith('.json'):
            update_resources_py()

if __name__ == "__main__":
    event_handler = ResourcesEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path=resources_folder, recursive=False)
    
    observer.start()
    print(f"Watching for changes in {resources_folder}...")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()