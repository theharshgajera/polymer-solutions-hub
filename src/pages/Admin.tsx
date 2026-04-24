import { useState, useEffect, useRef } from "react";
import { rawProducts } from "./Products";
import { Loader2, Upload, Trash2, LogOut, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(rawProducts[0].id);
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    localStorage.setItem("admin_token", password);
    setIsAuthenticated(true);
    toast.success("Logged in successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    toast.info("Logged out");
  };

  const getAuthHeader = () => {
    return {
      "x-admin-password": localStorage.getItem("admin_token") || "",
    };
  };

  // Fetch images for selected product
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/images?folder=/products/${selectedProductId}&t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching images. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
    }
  }, [selectedProductId, isAuthenticated]);

  // Upload image
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    // Append all selected files
    Array.from(files).forEach(file => {
      formData.append("files", file);
    });
    formData.append("folder", `/products/${selectedProductId}`);

    setIsUploading(true);
    try {
      const res = await fetch("/api/images/upload", {
        method: "POST",
        headers: getAuthHeader(),
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized: Invalid password");
        throw new Error("Upload failed");
      }

      toast.success("Image uploaded successfully");
      fetchImages(); // Refresh images
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error uploading image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Delete image
  const handleDelete = async (fileId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/images/${fileId}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized: Invalid password");
        throw new Error("Delete failed");
      }

      toast.success("Image deleted successfully");
      fetchImages(); // Refresh images
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error deleting image");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-light flex items-center justify-center p-4">
        <div className="bg-background max-w-md w-full rounded-2xl shadow-xl p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="font-body text-sm text-muted-foreground mt-2">Enter the admin password to manage images</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-bold text-sm hover:bg-accent transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const selectedProduct = rawProducts.find((p) => p.id === selectedProductId);

  return (
    <div className="min-h-screen bg-slate-light flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex-shrink-0 border-r border-navy-dark overflow-y-auto max-h-screen">
        <div className="p-6">
          <h2 className="font-heading text-xl font-bold mb-1">ImageKit Admin</h2>
          <p className="font-body text-xs text-white/50 mb-6">Manage product images</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-body mb-8"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
        <div className="px-4 pb-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-2">Products</p>
          <div className="space-y-1">
            {rawProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-body text-sm transition-colors ${
                  selectedProductId === product.id
                    ? "bg-gold text-navy font-semibold"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">{selectedProduct?.name}</h1>
              <p className="font-body text-muted-foreground mt-1 text-sm">
                Folder: <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">/products/{selectedProduct?.id}</span>
              </p>
            </div>
            <div>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
                id="upload-image"
              />
              <label
                htmlFor="upload-image"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-semibold text-sm cursor-pointer transition-colors ${
                  isUploading
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-accent shadow-sm"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Upload New Image
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-background rounded-xl p-6 shadow-sm border border-border min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="font-body text-sm">Fetching images from ImageKit...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground gap-3">
                <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
                <p className="font-body text-sm">No images found in this folder.</p>
                <p className="text-xs text-center max-w-xs opacity-70">
                  Upload an image using the button above to add it to this product's slideshow.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                  <div key={img.fileId} className="group relative aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(img.fileId)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                        title="Delete image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white font-mono truncate" title={img.name}>{img.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
